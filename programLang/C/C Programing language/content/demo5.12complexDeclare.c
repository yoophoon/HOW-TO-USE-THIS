/*  char **argv
 *    argv: 二级指针
 *  int (*daytab)[13]
 *    指向13个整型数组的指针
 *  int *daytab[13]
 *    13个整型指针数组
 *  void *comp()
 *    返回值为无类型指针的函数
 *  void (*comp)()
 *    无返回值的函数指针
 *  char (*(*x())[])()
 *    *x():返回指针的函数   与(*x)()区分后者为函数指针
 *    (*x())[]:指针指向数组
 *    *(*x())[]:数组为指针数组
 *    (*(*x())[])():数组的元素为函数指针
 *    char (*(*x())[])():数组元素(函数指针)指向的函数返回值类型为char
 *  char (*(*x[3])())[5]
 *    3个返回5个字符数组的函数指针数组
 *
 *  dcl:    *? direct-dcl   // *?   可选符号"*"
 *  direct-dcl:   name
 *                (dcl)
 *                direct-dcl()
 *                direct-dcl[ 可选长度 ]
 */

void dcl(void){
  int ns;

  // 指针是一切的罪魁祸首
  // 指针既可以由前文产生有可以用于指向后文语义
  for(ns = 0; gettoken() == '*') ns++;
  dirdcl();
  while(ns-- > 0)
    strcat(out,  " pointer to");
}

void dirdcl(void){
  int type;

  if(tokentype == '('){
    dcl();
    if(tokentype != ')') printf("error: missing )\n");
  }else if(tokentype == NAME) strcpy(name, token);
  else printf("error: expected name or (dcl)\n");

  while((type= gettoken()) == PARENS || type == BRACKETS)
    if(type == PARENS) strcat(out, " function returning");
    else{
      strcat(out, " array");
      strcat(out, token);
      strcat(out, " of");
    }
}
