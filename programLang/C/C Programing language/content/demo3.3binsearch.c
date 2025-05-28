#include<stdio.h>

int binsearch(int x, int v[], int n);

int main(){
  int x,v=[1, 3, 5, 7, 9];

  x=5,

  printf("the position is %d\n", binsearch(x, v, 5));

  return 0;
}

int binsearch(int x, int v[], int n){
  int low, high, mid;
  low = 0;
  high = n - 1;
  while(low <= high){
    mid = (low + high) / 2;
    if(x < v[mid])
      high = mid - 1;
    else if (x > v[mid])
      low = mid + 1;
    else
      return mid;
  }
  return -1;
}

// practice 3.1
int binsearch(int x, int v[], int n){
  int low, high, mid;

  low=0,high=n-1,mid=(low+high)/2;

  while(low <=high && v[mid]!=x){
    if(x>v[mid]) low = mid + 1;
    else if(x < v[mid]) high = mid +1;
  }

  if(x==v[mid]) return mid;
  else return -1;
}
