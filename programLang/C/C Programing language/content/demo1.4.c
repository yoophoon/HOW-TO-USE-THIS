#include<stdio.h>

#define LOWER 0
#define UPPER 200
#define STEP  20

int main(void){
  int fahr=0;

  for(;fahr<=300;fahr+=STEP){
    printf("%3d %6.1f\n", fahr, (5.0/9.0) * (fahr - 32));
  }

  return 0;
}
