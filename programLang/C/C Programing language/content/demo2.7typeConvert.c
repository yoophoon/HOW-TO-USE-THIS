#include<stdio.h>
#include "syscalls.h"

int atoi(char s[]){
  int i,n;

  n=0;
  // 这个循环就是将字符数字转换为整数数字
  for(i=0;s[i]>='0' && s[i]<='9';++i) 
    n=10*n + (s[i] - '0');

  return n;
}

int main(){
  char test[]="987654";

  printf("what fuck -> %d\n", atoi(test));

  return 0;
}

unsigned long int next= 1;
int rand(void){
  next= next*1103515245+12345;
  return (unsigned int)(next/65536) % 32768;
}
