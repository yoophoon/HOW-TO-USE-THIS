#include<stdio.h>

#define square(x) x * x
// 在字符串中使用参数
#define dprint(expr) printf(#expr "= %g \n", expr)
//dprint(x/y) -> printf("x/y" "= %g \n", x/y)
//               printf("x/y= %g \n", x/y)
//针对参数的特殊字符 "  ->  \"
//                   \  ->  \\

// 连接实参
#define paste(front, back) front ## back
//paste(name, 1) -> name1

// practice4.14swap
#define swap(t, x, y) do {t temp=x; x = y; y = temp} while (0)

char* getStr(int n);

int main(){
  int x=5;
  int* y=&x;

  printf("the number is %d\n", *y);

  // square(x + 1) -> x + 1 * x + 1 -> x + x + 1 -> 2*x + 1
  printf("the result is %d\n", square(x + 1));
  printf("string test" "dose this work\n");

  dprint("hello world");

  return 0;
}


char* getStr(int n){
  int* a;
  int b=10;
  a=&b;
  printf("the number is %d\n", *a);

  return "abc";
}
