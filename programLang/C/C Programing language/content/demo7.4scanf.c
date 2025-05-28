#include<stdio.h>

int main(){
  int day, year;
  char monthname[20];

  // scanf从上个scanf读取的内容后一个字符开始读取内容
  // 而非新开一个input buffer
  int z= scanf("%d%s%d\n", &day, monthname, &year);
  printf("get %d-%s-%d\n", day, monthname, year);
  printf("matched %d \n", z);

  double sum, v;
  int test;
  int n= scanf("zs%d", &test);
  printf("get %d matched input\n", n);
  printf("and the matched value is %d\n", test);
  while(scanf("%lf", &v) == 1)
    printf("\t%.2f\n", sum+= v);


  return 0;
}
