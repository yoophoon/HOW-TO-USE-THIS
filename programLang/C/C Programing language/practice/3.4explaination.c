#include<stdio.h>

void itoa(int n, char a[]);
int main(){

  return n;
}

void itoa(int n,char s[]){
  int i, sign;
  if((sign=n)<0) n=-n;
  i=0;
  do{
    s[i++]=n%10 + '0';
  }while((n/=10) > 0)
  if(sign < 0) s[i++] = '-';

  s[i]='\0';

  reverse(s);
}

// 因为c语言中各类型的负数取负仍为其本身
// 而do-while循环的执行条件为>0

