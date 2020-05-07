#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <arpa/inet.h>
#include <sys/socket.h>

#define BUF_SIZE 5
void error_handling(char *message);

int main(int argc, char *argv[]) {
  int serv_sock;
  char message[BUF_SIZE];
  socklen_t clnt_adr_sz;
  int str_len;
  
  struct sockaddr_in serv_adr, clnt_adr;

  if(argc != 2) {
    printf("usage: %s <port>\n", argv[0]);
    exit(1);
  }

  serv_sock = socket(PF_INET, SOCK_DGRAM, 0);
  if(serv_sock == -1) {
    char err_message[] = "UDP socket creation error";
    error_handling(err_message);
  }

  memset(&serv_adr, 0, sizeof(serv_adr));
  serv_adr.sin_family = AF_INET;
  serv_adr.sin_addr.s_addr = htonl(INADDR_ANY);
  serv_adr.sin_port = htons(atoi(argv[1]));
  
  if(bind(serv_sock, (struct sockaddr*)&serv_adr, sizeof(serv_adr)) == -1) {
    char err_message[] = "bind() error";
    error_handling(err_message);
  }

  while(1) {
    clnt_adr_sz = sizeof(clnt_adr);
    str_len = recvfrom(serv_sock, message, BUF_SIZE, 0, (struct sockaddr*)&clnt_adr, &clnt_adr_sz);
    printf("%s", message);
  }
  close(serv_sock);
  return 0;
}

void error_handling(char *message) {
  fputs(message, stderr);
  exit(1);
}