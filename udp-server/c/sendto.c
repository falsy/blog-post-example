#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <arpa/inet.h>
#include <sys/socket.h>

#define BUF_SIZE 50

int main(int argc, char *argv[]) {
  int sock;
  char message[BUF_SIZE];
  int str_len;
  socklen_t adr_sz;

  struct sockaddr_in serv_adr, from_adr;

  if(argc != 3) {
    printf("Usage : %s <IP> <port>\n", argv[0]);
    exit(1);
  }

  sock = socket(PF_INET, SOCK_DGRAM, 0);

  memset(&serv_adr, 0, sizeof(serv_adr));
  serv_adr.sin_family = AF_INET;
  serv_adr.sin_addr.s_addr = inet_addr(argv[1]);
  serv_adr.sin_port=htons(atoi(argv[2]));

  
  char msg[] = "Insert message(q to quit): ";
  fputs(msg, stdout);
  fgets(message, sizeof(message), stdin);

  sendto(sock, message, sizeof(message), 0, (struct sockaddr*)&serv_adr, sizeof(serv_adr));
  printf("Send Message: %s", message);
  return 0;
}