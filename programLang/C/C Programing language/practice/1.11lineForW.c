#include<stdio.h>

int main(void){
  int c;
  printf("key map works\n");
  while((c=getchar())!=EOF){
    if(c==' '||c=='\n'||c=='\t'){
      putchar('\n');
    }else{
      putchar(c);
    }
  }

  return 0;
}
