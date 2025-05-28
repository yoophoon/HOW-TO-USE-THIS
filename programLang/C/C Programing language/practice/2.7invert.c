#include<stdio.h>

int invert(int x, int p, int n);

int main(){
  int x,p,n;
  x=0777,p=3,n=3;

  printf("%d invert bits is %d\n", x, invert(x,p,n));


  return 0;
}

int invert(int x, int p, int n){
  int invertBits=(~((~0>>(p+n))<<(p+n))>>p)<<p;

  printf("invert bis is %d\n", invertBits);
  printf("keep value %d\n", x&~invertBits);
  printf("invert value %d\n", ~x&invertBits);
  return (x&~invertBits) + (~x&invertBits);
}
