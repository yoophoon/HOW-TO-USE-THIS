#include<stdio.h>
#include<ctype.h>

int main(int argc, char *argv[]){
  while(*argv[0]!= '\0'){
    putchar(toupper(*argv[0]++));
  }

  return 0;
}
