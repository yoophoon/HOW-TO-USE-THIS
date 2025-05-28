#include<stdio.h>

int main(void){
  // 获取输入内容的第一个字符，输入内容以回车结束
  char c=getchar();
  // 打印内容的第一个字符
  putchar(c);
  //putchar("putchar"); //error for char * argument
  //putchar("A");       //error for char * argument
  putchar(97);

  return 0;
}
