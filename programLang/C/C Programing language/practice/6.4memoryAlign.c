#include<stdio.h>

int main(){
  struct inOrder {
    char a;
    int b;
  };

  struct outOrder {
    int b;
    char a;
  };

  printf("size of inOrder is %d\n", sizeof(struct inOrder));
  printf("size of outOrder is %d\n", sizeof(struct outOrder));

  return 0;
}
