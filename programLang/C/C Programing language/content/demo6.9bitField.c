#include<stdio.h>
#include<stdlib.h>

int main(){
  struct {
    // 位字段仅占用指定宽度的比特位
    // [:width], 申明width比特位字段
    unsigned int is_keyword :1;
    unsigned int is_extern  :3;
    unsigned int is_static  :1;
  } *flags= malloc(sizeof(*flags));

  (*flags).is_keyword= 1;
  (*flags).is_extern= 2;
  (*flags).is_static= 0;

  printf("the result is %d\n", *flags);

  // 字段不是数组，没有地址，所以不能取地址
  // printf("the result is %p\n", (void *)(&((*flags).is_keyword)));

  return 0;
}
