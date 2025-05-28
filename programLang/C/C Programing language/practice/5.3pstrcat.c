#include<stdio.h>

void pstrcat(char *s, char *t);


int main(){
  char *t="hello world";
  char as[1000]="hi";
  char *s=as;

  pstrcat(s, t);

  printf("the result is %s\n", s);




  return 0;
}

void pstrcat(char *s, char *t){
  for(;*s!='\0';s++);
  for(;(*s++=*t++)!='\0';);
  *s='\0';
}

