#include <stdio.h>
#include <sys/socket.h>
#include <stdlib.h>
#include <unistd.h>
#include <netinet/in.h>
#include <string.h>
#include <arpa/inet.h>

#define PORT 6666
#define BUF_SIZE 50

int main(int argc, char const *argv[])
{
    int sock = 0; long valread;
    struct sockaddr_in serv_addr;
    char message[BUF_SIZE];
    
    if ((sock = socket(AF_INET, SOCK_STREAM, 0)) < 0)
    {
        printf("\n Socket creation error \n");
        return -1;
    }
    
    memset(&serv_addr, '0', sizeof(serv_addr));
    
    serv_addr.sin_family = AF_INET;
    serv_addr.sin_port = htons(PORT);
    
    // Convert IPv4 and IPv6 addresses from text to binary form
    if(inet_pton(AF_INET, "127.0.0.1", &serv_addr.sin_addr)<=0)
    {
        printf("\nInvalid address/ Address not supported \n");
        return -1;
    }
    
    if (connect(sock, (struct sockaddr *)&serv_addr, sizeof(serv_addr)) < 0)
    {
        printf("\nConnection Failed \n");
        return -1;
    }

    char msg[] = "Insert message(q to quit): ";
    fputs(msg, stdout);
    fgets(message, sizeof(message), stdin);

    send(sock , message , strlen(message) , 0 );
    printf("Send Message: %s", message);
    return 0;
}

// 참고 https://medium.com/from-the-scratch/http-server-what-do-you-need-to-know-to-build-a-simple-http-server-from-scratch-d1ef8945e4fa

// #include <stdio.h>
// #include <stdlib.h>
// #include <string.h>
// #include <unistd.h>
// #include <arpa/inet.h>
// #include <sys/socket.h>

// #define BUF_SIZE 50
// void error_handling(char *message);

// int main(int argc, char *argv[]) {
//   int sock;
//   char message[BUF_SIZE];
//   int str_len;
//   socklen_t adr_sz;

//   struct sockaddr_in serv_adr, from_adr;

//   if(argc != 3) {
//     printf("Usage : %s <IP> <port>\n", argv[0]);
//     exit(1);
//   }

//   sock = socket(PF_INET, SOCK_STREAM, 0);
//   if(sock == -1) {
//     char msg1[] = "socket() error";
//     error_handling(msg1);
//   } else {
//     char msg[] = "socket OK";
//     printf("%s", msg);
//   }

//   memset(&serv_adr, 0, sizeof(serv_adr));
//   serv_adr.sin_family = AF_INET;
//   serv_adr.sin_addr.s_addr = inet_addr(argv[1]);
//   serv_adr.sin_port = htons(atoi(argv[2]));

//   if(connect(sock, (struct sockaddr*)&serv_adr, sizeof(serv_adr) == -1)) {
//     char msg1[] = "connect error";
//     error_handling(msg1);
//   } else {
//     char msg1[] = "connect OK";
//     printf("%s", msg1);
//   }

//   while (1) {
//     char msg[] = "Insert message(q to quit): ";
//     fputs(msg, stdout);
//     fgets(message, sizeof(message), stdin);
//     char breakString[] = "q\n";
//     if(!strcmp(message, breakString)) break;

//     send(sock, message, sizeof(message), 0);
//     printf("Send Message: %s", message);
//   }

//   close(sock);
//   return 0;
// }

// void error_handling(char *message) {
//   fputs(message, stderr);
//   fputc('\n', stderr);
//   exit(1);
// }