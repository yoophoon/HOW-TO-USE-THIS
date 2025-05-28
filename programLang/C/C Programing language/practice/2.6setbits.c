#include<stdio.h>

int setbits(int x, int p, int n, int y);

int main(){
  int x,p,n,y;

  x=0777,p=3,n=3,y=0444;

  printf("%d setbits is %d\n", x, setbits(x, p, n, y));

  return 0;
}

int setbits(int x, int p, int n, int y){
  int keepBits=(~((~0<<(p+n))^0)>>n)<<n;

  return (x&~keepBits) | (y&keepBits);
}
