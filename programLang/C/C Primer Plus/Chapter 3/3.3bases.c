/* 以十进制、八进制、十六进制打印十进制数100 */
#include<stdio.h>

void toobig(void);

int main(void)
{
  int x=100;

  printf("dec = %d; octal = %o; hex = %x\n", x, x, x);
  // 按指定进制显示数值并添加前缀
  printf("dec = %d; octal = %#o; hex = %#x\n", x, x, x);
  
  toobig();

  return 0;
}
/* integer over flow */
void toobig(void)
{
  int i = 2147483647;
  unsigned int j = 4294967295;

  printf("%d %d %d\n", i, i+1, i+2);
  printf("%u %u %u\n", j, j+1, j+2);
}
