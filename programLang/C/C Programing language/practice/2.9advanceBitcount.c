#include<stdio.h>

int bitcount(int x);

// x&=(x-1)
// x=x&(x-1)
//  ...10...
// &...01...+1

int main(){
  int x;

  x=0741;

  printf("%d get %d 1bits\n", x, bitcount(x));
  
  return 0;
}

int bitcount(int x){
  if(x==0) return 0;
  if(x<0) x=-x;

  int index;
  for(index=1; (x&=(x-1))>0; index++) ;

  return index;
}

