#include <stdio.h>
#include <sys/socket.h>
#include <unistd.h>
#include <stdlib.h>
#include <netinet/in.h>
#include <string.h>

#define PORT 6666
int main(int argc, char const *argv[])
{
    int server_fd, new_socket; long valread;
    struct sockaddr_in address;
    int addrlen = sizeof(address);

    // Only this line has been changed. Everything is same.
    char *hello = "HTTP/1.1 200 OK\nContent-Type: text/plain\nContent-Length: 12\n\nHello world!";

    // Creating socket file descriptor
    if ((server_fd = socket(AF_INET, SOCK_STREAM, 0)) == 0)
    {
        perror("In socket");
        exit(EXIT_FAILURE);
    }


    address.sin_family = AF_INET;
    address.sin_addr.s_addr = INADDR_ANY;
    address.sin_port = htons( PORT );

    memset(address.sin_zero, '\0', sizeof address.sin_zero);


    if (bind(server_fd, (struct sockaddr *)&address, sizeof(address))<0)
    {
        perror("In bind");
        exit(EXIT_FAILURE);
    }
    if (listen(server_fd, 10) < 0)
    {
        perror("In listen");
        exit(EXIT_FAILURE);
    }
    while(1)
    {
        printf("\n+++++++ Waiting for new connection ++++++++\n\n");
        if ((new_socket = accept(server_fd, (struct sockaddr *)&address, (socklen_t*)&addrlen))<0)
        {
            perror("In accept");
            exit(EXIT_FAILURE);
        }

        char buffer[30000] = {0};
        valread = read( new_socket , buffer, 30000);
        printf("%s\n",buffer );
        write(new_socket , hello , strlen(hello));
        printf("------------------Hello message sent-------------------");
        close(new_socket);
    }
    return 0;
}

// 참고 https://medium.com/from-the-scratch/http-server-what-do-you-need-to-know-to-build-a-simple-http-server-from-scratch-d1ef8945e4fa

// #include <stdio.h>
// #include <stdlib.h>
// #include <string.h>
// #include <unistd.h>
// #include <arpa/inet.h>
// #include <sys/socket.h>

// #define PORT 6666
// #define BUF_SIZE 5
// void error_handling(char *message);

// int main(int argc, char *argv[]) {
//   int serv_sock, new_sock;
//   char message[BUF_SIZE];
//   // socklen_t serv_adr_sz;
//   int str_len;
  
//   struct sockaddr_in serv_adr, clnt_adr;

//   char msg[] = "start";
//   printf("%s", msg);

//   if(argc != 2) {
//     printf("usage: %s <port>\n", argv[0]);
//     exit(1);
//   } else {
//     char msg[] = "start OK";
//     printf("%s", msg);
//   }

//   serv_sock = socket(PF_INET, SOCK_STREAM, 0);
//   if(serv_sock == -1) {
//     error_handling("TCP socket creation error");
//   } else {
//     char msg[] = "socket OK";
//     printf("%s", msg);
//   }

//   memset(&serv_adr, 0, sizeof(serv_adr));
//   serv_adr.sin_family = AF_INET;
//   serv_adr.sin_addr.s_addr = htonl(INADDR_ANY);
//   serv_adr.sin_port = htons(PORT);
  
//   if(bind(serv_sock, (struct sockaddr*)&serv_adr, sizeof(serv_adr)) == -1) {
//     error_handling("bind() error");
//   } else {
//     char msg[] = "bind OK";
//     printf("%s", msg);
//   }

//   if(listen(serv_sock, 2) == -1) {
//     error_handling("listen() error");
//   } else {
//     char msg[] = "listen OK";
//     printf("%s", msg);
//   }

//   printf("aa");

//   // clnt_sock = accept(serv_sock, (struct sockaddr*)&clnt_adr, sizeof(clnt_adr));

//   // printf("%d", clnt_sock);

//   while(1) {
//     // serv_adr_sz = sizeof(serv_adr);
//     int serv_adr_sz = sizeof(serv_adr);
//     new_sock = accept(serv_sock, (struct sockaddr*)&serv_adr, (socklen_t*)&serv_adr_sz);

//     printf("%d", new_sock);

//     if(new_sock < 0) {
//       printf("%s\n", "none accept");
//     } else {
//       str_len = read(new_sock, message, BUF_SIZE);
//       printf("%s\n", message);
//     };
//   }

//   // closesocket(serv_sock);
//   // close(serv_sock);
//   // return 0;
// }

// void error_handling(char *message) {
//   fputs(message, stderr);
//   exit(1);
// }