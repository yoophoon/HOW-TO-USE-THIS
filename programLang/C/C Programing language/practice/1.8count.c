#include<stdio.h>
int main(void){
  int c,cs=0,ct=0,cn=0;

  while((c=getchar())!=EOF){
    if(c==' ') ++cs;
    else if(c=='\t') ++ct;
    else if(c=='\n') ++cn;
  }

  printf("%d space, %d tab, %d newline\n", cs, ct, cn);

  return 0;
}
