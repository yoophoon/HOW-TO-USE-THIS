#include<stdio.h>

int main(void){
  int c;
  while((c=getchar())!=EOF){
    if(c=='\t'){
      putchar('\\');
      putchar('t');
    // 这里回退符在终端必须使用其字面量输入，否则终端会自动合成回退符输入程序
    }else if(c=='\b'){
      putchar('\\');
      putchar('b');
    }else if(c=='\\'){
      putchar('\\');
      putchar('\\');
    }else{
      putchar(c);
    }
  }

  return 0;
}
