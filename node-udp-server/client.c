#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <sys/types.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <arpa/inet.h>
#include <unistd.h>

#define MAXLINE  511 //최대값 지정
#define BLOCK 255 //BLOCK 단위로 저장

struct sockaddr_in servaddr;
int addrlen = sizeof(servaddr); //서버 주소의 size를 저장

//메시지 전송 부분 처리
void sendMessage(int s, char* buf) {
    if((sendto(s, buf, strlen(buf), 0, (struct sockaddr *)&servaddr, addrlen)) < 0) {
        perror("sendto fail");
        exit(0);
    }
}

int main(int argc, char *argv[]) {
    int s; //socket
    int nbyte;
    char buf[MAXLINE+1], buf2[MAXLINE+1];
    FILE *stream; //파일 입출력

    //./udp_echocli.c ip주소, 포트번호, 입출력 파일명
    if(argc != 4) {
        printf("usage: %s ip_address port_number filename\n", argv[0]);
        exit(0);
    }

    //socket 연결 0보다 작으면 Error
    if((s = socket(PF_INET, SOCK_DGRAM, 0)) < 0) {
        perror("socket fail");
        exit(0);
    }
    
    //서버 주소 구조
    memset(&servaddr, 0, addrlen); //bzero((char *)&servaddr, sizeof(servaddr));
    servaddr.sin_family = AF_INET; //인터넷 Addr Family
    servaddr.sin_addr.s_addr = inet_addr(argv[1]); //argv[1]에서 주소를 가져옴
    servaddr.sin_port = htons(atoi(argv[2])); //argv[2]에서 port를 가져옴

	if((stream = fopen(argv[3], "r")) == NULL) { //argv[3]의 파일을 open
		printf("Error");
	 	exit(1);
	}

    //stream 파일 읽기 
	while(!feof(stream)) {
		buf[0] = '\0'; //buffer를 초기화
		fgets(buf, BLOCK, stream); //buffer에 BLOCK 만큼 읽어들임

		printf("Send : %s\n", buf); //보낼 메시지 출력
        
   		sendMessage(s, buf);
	}
	fclose(stream);

    sendMessage(s, "end of file"); //파일 입출력 전송 완료 처리

    //recvfrom 처리 부분
	if((stream = fopen(argv[3], "r")) == NULL) {
		printf("Error not File");
		exit(1);
	}
    
	while(!feof(stream))
	{
		buf2[0] = '\0'; //2번째 buffer 초기화
		fgets(buf2, BLOCK, stream); //buf2에 파일을 읽어 들임
		puts("get Server : waiting request.");
        sendMessage(s, buf);
		if((nbyte = recvfrom(s, buf, MAXLINE, 0, 
				(struct sockaddr *)&servaddr, (socklen_t *)&addrlen)) < 0) {
			perror("recvfrom fail");
			exit(1);
		}
		buf[nbyte] = 0;

		if(strncmp(buf, buf2, BLOCK)) { //전송 받은 buf와 buf2의 값 비교
			printf("Not Match buf : %s\nbuf2 : %s", buf, buf2);
			fclose(stream);
			exit(0);
		} else {
			printf("Match buf : %s\nbuf2 : %s", buf, buf2);
		}
		
		puts("sendto complete");
	}
    
	fclose(stream); //stream close
    close(s); //socket close
    return 0;
}

// 출처 : https://thdev.net/175