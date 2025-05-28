#include<stdio.h>
int htoi(char hStr[]);

int main(){
  char hStr[]="1a2b3c";
  char hxStr[]="0x2b5c7f";

  printf("hStr is %x\n", htoi(hStr));
  printf("hxStr is %x\n", htoi(hStr));


  return 0;
}


int htoi(char hStr[]){
  int n=0,i=0;
  
  if(hStr[0] == '0' && (hStr[1]=='x' || hStr[1]=='X'))
    i=2;

  for( ;
      (hStr[i]>='0' && hStr[i]<='9') ||
      (hStr[i]>='a' && hStr[i]<='f') ||
      (hStr[i]>='A' && hStr[i]<='F'); 
      ++i){
    if(hStr[i] >='0' && hStr[i]<='9')
      n=n*16 + hStr[i]-'0';
    else if(hStr[i]>='a' && hStr[i]<='f')
      n=n*16 + hStr[i]-'a'+10;
    else if(hStr[i]>='A' && hStr[i]<='F')
      n=n*16 + hStr[i]-'A'+10;
  }

  return n;
}

