#include<stdio.h>

int factorial(int);

int main(){
  int n, i= 0, res= 0;
  scanf("%d", &n);

  while((n= n-++i)>= 0)
    res+= i*i;

  res+= i*(n<0?n+i:0);
  printf("the result is %d\n", res);

  printf("the factorial result is %d\n", factorial(3));

  return 0;
}

int factorial(int i){
  if(i== 1||i== 0){
    return 1;
  }else {
    return i*factorial(i-1);
  }
}
