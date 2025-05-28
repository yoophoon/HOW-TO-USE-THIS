/* 更多printf()的特性 */
#include<stdio.h>

void typeSize(void);

int main(void)
{
  unsigned int un = 3000000000;   // int 为32位和short 为16位的系统
  short end = 200;
  long big = 65537;
  long long verybig = 12345678908642;

  typeSize();
  printf("un = %u and not %d\n", un, un);
  printf("end = %hd and %d\n", end, end);
  printf("big = %ld and not %hd\n", big, big);
  printf("verybig = %lld and not %ld\n", verybig, verybig);

  return 0;
}

void typeSize()
{
  printf("data type size------------------------------------\n");
  printf("char: %lu bytes\n", sizeof(char));
  printf("unsigned: %lu bytes\n", sizeof(unsigned));
  printf("short: %lu bytes\n", sizeof(short));
  printf("int: %lu bytes\n", sizeof(int));
  printf("long: %lu bytes\n", sizeof(long));
  printf("long long: %lu bytes\n", sizeof(long long));
  printf("float: %lu bytes\n", sizeof(float));
  printf("double: %lu bytes\n", sizeof(double));
  printf("void*: %lu bytes\n", sizeof(void*));
  printf("data type size------------------------------------\n");
}
