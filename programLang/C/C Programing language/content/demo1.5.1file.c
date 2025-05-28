#include <stdio.h>
// handle all input
int main(void){
  int c;

  c=getchar();
  putchar(c);
  putchar(c);
  // > abc
  // < a
  // printf("%s\n", &c);
  // 好像getchar是对input的逐个读取
  // 注意EOF EOT ETX前者为C语言中的概念后者为ASCII中的概念
  // EOT表示数据传输结束 ^D   相对于C即为EOF
  // ETX表示文本结束     ^C   终端有另一个含义
  // 即进程终止信号，导致进程退出状态码非零
  // 在控制台中 后两者用于控制进程行为 在C语言中EOF用于标志流状态
  // 在不同的场合的不同概念，虽然终端输入EOT会被C解释成EOF但这是两个完全不相关
  // 的概念
  while(c!=EOF){
    /* printf("input char is %d \n", c); */
    putchar(c);
    c=getchar();
  }
  return 0;
}
