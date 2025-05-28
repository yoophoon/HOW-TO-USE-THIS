#include<stdio.h>

int main(void){
  char c=0,cmin=~c<<(sizeof(char)*8-1),cmax=~cmin;
  unsigned char uc=0,ucmax=~uc;
  short s=0,smin=~s<<(sizeof(short)*8-1),smax=~smin;
  unsigned short us=0,usmax=~us;
  int i=0,imin=~i<<(sizeof(int)*8-1),imax=~imin;
  unsigned int ui=0,uimax=~ui;
  long l=0,lmin=~l<<(sizeof(long)*8-1),lmax=~lmin;
  unsigned long ul=0,ulmax=~ul;

  //printf可以直接设置数据格式，这里因为在编写的时候没有查文档所以在前面进行了
  //类型转换
  printf("the char range is from %d to %d\n", cmin,cmax);
  printf("the unsigned char range is from %u to %u\n", uc, ucmax);
  printf("the short range is from %d to %d\n", smin, smax);
  printf("the unsigned short range is from %u to %u\n", us, usmax);
  printf("the int range is from %d to %d\n", imin, imax);
  printf("the unsigned int range is from %u to %u\n", ui, uimax);
  printf("the long range is from %ld to %ld\n", lmin, lmax);
  printf("the unsigned long range is from %lu to %lu\n", ul, ulmax);

  printf("nice printf");

  unsigned char test=~uc;
  printf("test %u\n",test);
  return 0;
}
