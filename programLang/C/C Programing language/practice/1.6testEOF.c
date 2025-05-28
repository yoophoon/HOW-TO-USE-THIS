#include<stdio.h>

int main(void){
  int c;
  if((c=getchar())==EOF){
    printf("EOF value is %d", c);
  }else if(c!=EOF){
    printf("Char value is %d", c);
  }

  return 0;
}
