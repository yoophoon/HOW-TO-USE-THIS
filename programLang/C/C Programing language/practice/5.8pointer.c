#include<stdio.h>
#include<stdlib.h>

int day_of_year(int year, int month, int day);
void month_day(int year, int yearday, int *pmonth, int *pday);

static char daytab[][13] = {
  {0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31},
  {0, 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31}
};

int main(){
  int year=2025;
  int month=5;
  int day=19;
  int yearday=100;
  // C是将指针交由用户完全控制所以必须由用户手动初始化其指向的地址
  // 普通变量则由C随机取值初始化(静态变量及全局变量会被初始化为0)
  int *pmonth=malloc(sizeof(int)), *pday=malloc(sizeof(int));

  printf("%d-%d-%d is the %d of the year\n",
         year,
         month,
         day,
         day_of_year(year, month, day)
      );

  month_day(year, yearday, pmonth, pday);
  printf("the %d day of %d year is month %d day %d\n",
         yearday,
         year,
         *pmonth,
         *pday
      );

  return 0;
}

int day_of_year(int year, int month, int day){
  int i, leap;
  
  leap=year%4==0 && year%100!=0 || year%400 ==0;
  for(i=1;i<month;i++) day+=*(daytab[leap]+i);

  return day;
}

void month_day(int year, int yearday, int *pmonth, int *pday){
  int i, leap;

  leap=year%4==0 && year%100!=0 || year%400 ==0;
  for(i=1;yearday > *(daytab[leap]+i);i++) yearday-=*(daytab[leap]+i);
  *pmonth=i;
  *pday=yearday;
}

