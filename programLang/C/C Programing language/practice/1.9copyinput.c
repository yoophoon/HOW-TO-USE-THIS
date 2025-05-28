#include<stdio.h>

int main(void){
  int c,continuousS;

  while((c=getchar())!=EOF){
    if(c==' '){
      if(!continuousS){
        continuousS=1;
        putchar(c);
      }
    }else if(c!=' '){
      continuousS=0;
      putchar(c);
    }
  }

  return 0;
}

    
