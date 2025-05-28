#include<stdio.h>

char * month_name(int n);

int main(){
  printf("1 for %s\n", month_name(1));

  return 0;
}

char* month_name(int n){
  static char *name[]={
    "Illegal month",
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  };

  for(int i=0;i<=30;i++)
    // *name[]是指向指针地址的指针
    // 在指针层面:
    // c语言的字符串本质是指向首字符的指针，数组的本质是指向元素地址的指针
    printf("the value is %c\n", **(name+i));
    // 所以上面打印语句采用 *(name+i) 无法获取其真实存储的字符
    //                     **(name+i) 可以获取每个元素的首字符


  return (n<1 || n>12)? name[0]:name[n];
}
