#include<stdio.h>

void test1(char daytab[][13]);
void test2(char (*daytab)[13]);
void test3(char *daytab[5]);

int main(){
  char daytab[][13] = {
    {0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31},
    {0, 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31}
  };
  char A=1,B=2,C=3,D=4,E=5;
  char a[]="012345678912";
  char *b[5]={&A,&B,&C,&D,&E};
  test1(daytab);
  test2(&a);
  test2(daytab);
  test2(&daytab[0]);
  test3(b);

  //                                          类型
  // a = &a[0] = 首元素地址                   地址
  // &a = *[size] = 数组地址                数组地址
  // a[][2] = (*a)[2] = &a[] = 数组地址     数组指针
  // *a[]=**                                二级指针数组
  // 地址是地址，地址可以取值
  // 指针是指针，指针可以解引用(间接寻址、间接解引用运算符)
  // 指针是指向地址的值，地址是记录变量的位置

  return 0;
}
// 类型为[][13]
void test1(char daytab[][13]){
  printf("int daytab[][13] get %d\n", daytab[0][1]);
}
// 类型为(*)[13]
void test2(char (*daytab)[13]){
  printf("int (*daytab)[13] get %d\n", *(*daytab+1));
}
// 类型为 ** 二级指针即指针的指针
void test3(char *daytab[5]){
  printf("int *daytab[13] get %d\n", *daytab[1]);
}
