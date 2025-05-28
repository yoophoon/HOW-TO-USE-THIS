#include<stdio.h>

void resolveCelsius(void);

int main(void){
  int fahrenheit;
  scanf("%d", &fahrenheit);
  printf("\nYou input fahrenheit is %d,the celsius is %d\n", fahrenheit, (fahrenheit - 32) *  5 / 9);
  resolveCelsius();
  return 0;
}

void resolveCelsius(void){
  int fahr, celsius;
  int lower=0, upper=300, step=20;

  fahr=lower;
  while(fahr<=upper){
    celsius = 5 * (fahr -32) / 9;
    printf("%d\t%d\n", fahr, celsius);
    fahr=fahr + step;
  }
}
