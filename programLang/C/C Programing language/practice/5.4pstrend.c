#include<stdio.h>

int pstrend(char *s, char *t);

int main(){
  char s[]="hello world";
  char t[]="world";

  if(pstrend(s,t))
    printf("inclusive\n");
  else
    printf("exclusive\n");

  return 0;
}

int pstrend(char *s, char *t){
  char *x, *y;
  x=s,y=t;

  for(;*x!='\0'; x++);
  for(;*y!='\0'; y++);

  for(;*x==*y;x--,y--){
    if(y==t && x>=s)
      return 1;
  }
  return 0;
}
