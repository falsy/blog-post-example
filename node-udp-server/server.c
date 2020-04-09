#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <sys/types.h>
#include <sys/socket.h>
#include <netinet/in.h>

#define MAXLINE    511
#define BLOCK      255
#define FILENAME "buf.txt"

int main(int argc, char *argv[]) {
    struct sockaddr_in servaddr, cliaddr;
    int s, nbyte, addrlen = sizeof(struct sockaddr);
    char buf[MAXLINE+1];
	FILE *stream; //파일 입출력
    
    //파일명 포트번호
    if(argc != 2) { 
        printf("usage: %s port\n", argv[0]);
        exit(0);
    }
    
    //소켓 생성
    if((s = socket(PF_INET, SOCK_DGRAM, 0)) < 0) {
        perror("socket fail");
        exit(0);
    }
    
    // 서버 구조
    memset(&cliaddr, 0, addrlen); //bzero((char *)&cliaddr, addrlen);
    memset(&servaddr, 0, addrlen); //bzero((char *)&servaddr,addrlen);
    servaddr.sin_family = AF_INET;
    servaddr.sin_addr.s_addr = htonl(INADDR_ANY);
    servaddr.sin_port = htons(atoi(argv[1])); //argv[1]에서 port 번호 가지고 옴

    // 서버 로컬 주소로 bind()
    if(bind(s, (struct sockaddr *)&servaddr, addrlen) < 0) {
        perror("bind fail");
        exit(0);
    }
    
  printf(servaddr.sin_port);

    //저장용 파일 생성
	if((stream = fopen(FILENAME, "w")) == 0) {
        printf("Faile open error\n");
        exit(1);
    }
    while(1)
    {
        puts("Server : waiting request.");
         //전송 받은 메시지 nbyte 저장
        nbyte = recvfrom(s, buf, MAXLINE , 0, (struct sockaddr *)&cliaddr, (socklen_t *)&addrlen);
        if(nbyte< 0) {
            perror("recvfrom fail");
            exit(1);
        }
        buf[nbyte] = 0; //마지막 값에 0
	
        if(!strncmp(buf, "end of file", 10)) { //마지막 메시지가 end of file이면 종료
            printf("file close");
            fclose(stream); //stream 닫기
            break; //while문 빠져나가기
        } else {
        	printf("%d byte recv: %s\n",nbyte, buf);
            fputs(buf, stream); //파일로 저장
        }
        puts("sendto complete");
    }
	if((stream = fopen(FILENAME, "r")) == NULL) {
		printf("Read File Error");
		exit(1);
	}

	while(!feof(stream)) {
		buf[0] = '\0';
		fgets(buf, BLOCK, stream);
		printf("Send : %s\n", buf);
        //메시지 전송
		if(sendto(s, buf, strlen(buf), 0, (struct sockaddr *)&cliaddr, addrlen) < 0) {
			perror("sendto fail");
			exit(0);
		}
	}
	fclose(stream);
    close(s);
	return 0;
}

// 출처 : https://thdev.net/175