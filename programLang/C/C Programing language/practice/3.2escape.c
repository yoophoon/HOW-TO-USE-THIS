#include<stdio.h>

void escape(char s[], char t[]);
void descape(char s[], char t[]);

int main(){
  
  return 0;
}

void escape(char s[], char t[]){
  int sLen;
  for(sLen = 0; s[sLen]!=EOF;sLen++);

  for(int i=0;t[i]!=EOF;i++){
    switch(t[i]){
      case '\n':
        s[sLen++]='\\';
        s[sLen++]='n';
        break;
      case '\t':
        s[sLen++]='\\';
        s[sLen++]='t';
        break;
      default:
        s[sLen++]=t[i];
    }
  }
}

void descape(char s[], char t[]){
  int sLen;
  for(sLen = 0; s[sLen]!=EOF; sLen++);

  for(int i=0;t[i]!=EOF;i++){
    switch(t[i]){
      case '\\':
        i++;
        if(t[i]=='t') s[sLen++]='\t';
        else if(t[i]=='n') s[sLen++]='\n';
        break;
      default:
        s[sLen++]=t[i];
    }
  }
}
