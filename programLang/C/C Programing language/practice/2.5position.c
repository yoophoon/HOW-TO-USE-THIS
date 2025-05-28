#include<stdio.h>

int any(char s1[], char s2[]);

int main(){
  char source[]="hello world";
  char index[]="fuck";

  printf("the index is %d\n", any(source, index));

  return 0;
}

int any(char s1[], char s2[]){
  int index=-1;

  for(int i=0; s2[i]!='\0' && index==-1; i++){
    for(int j=0; s1[j]!='\0' && index==-1; j++){
      // no break
      if(s1[j]==s2[i]) index=j;
    }
  }

  return index;
}
