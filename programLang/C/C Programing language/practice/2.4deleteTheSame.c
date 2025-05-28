#include<stdio.h>

void squeeze(char s1[], char s2[]);

int main(){
  char source[]="abcd";
  char pop[]="bd";

  squeeze(source, pop);

  return 0;
}


void squeeze(char s1[], char s2[]){
  int x=0,keep=1;
  for(int i=0; s1[i]!='\0'; i++){
    for(int j=0; s2[j]!='\0'; j++){
      if(s2[j]==s1[i]) keep=0;
    }

    if(keep) s1[x++]=s1[i];
    keep=1;
  }

  s1[x]='\0';
  printf("remove the same character form s2, the result is %s\n", s1);

  char test[]="hello world";
  test[5]='\0';
  printf("%s\n", test);
}
