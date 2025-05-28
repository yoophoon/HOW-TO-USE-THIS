#include<stdio.h>

int rightrot(int x, int n);

int main(){
  int x,n;

  x=0147,n=3;
  printf("%d rot is %d\n", x, rightrot(x, n));

  return 0;
}

int rightrot(int x, int n){
  int rotFromBit=~((~0>>n)<<n);

  int confirmBits=0;
  int index;
  for(index=1;x>(x&(confirmBits=(confirmBits<<1)+1)) && index++;)
    printf("total bits is %d, value is %d\n", index, confirmBits);


  return (x>>n)+((x&rotFromBit)<<(index-n));
}

