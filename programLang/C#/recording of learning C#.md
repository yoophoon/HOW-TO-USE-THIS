# [C#命名规则和约定](https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/coding-style/identifier-names)
## 命名规则[Identifiers article in the C# Language Specification](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/language-specification/lexical-structure#643-identifiers)
### 标识符通用规则
- 以字母或者下划线开头;
- 包含字符、数字、连接符;(Unicode connecting characters, Unicode combining characters, or Unicode formatting characters)这三类字符似乎一般人用不到
- 关键字标识符 @keyword;@if @本身不作为标识符的内容，用于与其他语言的交互
### 命名约定
C#使用帕斯卡命名法(PascalCase)对名称、命名空间及所有公共成员命名。
- 接口(Interface)以I开头
- 特性(Attribute)以Attribute结尾
- 枚举(enum)单数用于非标记，复数用于标记
- 标识符不应使用连续下划线命名，这被保留用作编译器生成的标识符
- 变量、方法及类使用有意义的且描述性的标识符
- 清晰而不简短
- 帕斯卡命名法用于类名及方法名
- 驼峰法(camelCase)用于方法参数和局部变量
- 帕斯卡命名法用于常量，无论局部常量还是字段常量
- 私有实例以下划线(underscore)开头其余的文字采用驼峰法
- 静态字段以s_开头
- 避免使用简写或首字母缩写，除非是广为人知的
- 使用有意义的且描述性的符合反向域名表示法(the reverse domain name notation)的命名空间
- 选择一个能表述程序集主要目的的名称
- 避免使用单字母名称除非用于简单循环计数，此外，描述C#解构的语法样例经常使用以下符合[C#语言特性](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/language-specification/lexical-structure#643-identifiers)的单字母名称
  - S用于结构体，C用于类
  - M用于方法
  - V用于变量，p用于参数
  - r用于引用(ref)参数

**可以使用命名规则编码系统规则([code-style naming rules](https://learn.microsoft.com/en-us/dotnet/fundamentals/code-analysis/style-rules/naming-rules))强制命名关注大写、前缀、后缀及分字符的约定**

### 样例
#### 帕斯卡命名法
当给类、接口、结构体或委托(delegate)类型命名时使用帕斯卡命名法
```C#
public class DataService
{
}
public record PhysicalAddress(
    string Street,
    string City,
    string StateOrProvince,
    string ZipCode);
public struct ValueCoordinate
{
}
public delegate void DelegateType(string message);
```
当给接口命名时用以I开头的帕斯卡命名法命名，I清晰的表明这是个接口
```C#
public interface IWorkerQueue
{
}
```
当给公共成员类型比如字段、属性、事件或所有方法以及局部函数命名时采用帕斯卡命名法命名
```C#
public class EampleEvents
{
    //公共字段段应尽量少用
    public bool IsValid;
    //初始化属性
    public IWorkerQueue WorkerQueue {get;set;}
    //事件
    public event Action EventProcessing;
    //方法
    public void StartEventProcessing()
    {
        //局部函数
        static int CountQueueItems()=>WorkerQueue.count;
    }
}
```
当编写位置记录时采用帕斯卡命名法用于参数因为它们是记录的公共属性
```C#
public record PhysicalAddress(string Street,
    string City,
    string StateOrProvince,
    string ZipCode);
```
#### 驼峰命名法
命名私有或内部字段时使用驼峰法并且用下划线(_)作为前缀，使用驼峰法命名包括委托(delegate)实例类型在内的局部变量
```C#
public class DataService
{
    private IWorkerQueue _workerQueue;
}
```
**当在支持补全申明IDE中编辑以这种约定命名的C#代码时，键入_将会显示所有的对象作用域成员**
当使用私有或内部静态字段时采用s_前缀、使用静态线程时采用t_前缀
```C#
public class DataService
{
    private static IWorkerQueue s_workerQueue;
    [ThreadStatic]
    private static TimeSpan t_timeSpan;
}
```
当使用方法参数时采用驼峰命名法
```C#
public T SomeMethod<T>(int someNumber,bool isValid)
{
}
```
**更多信息可以查阅[.NET Runtime team's coding style](https://github.com/dotnet/runtime/blob/main/docs/coding-guidelines/coding-style.md)**
## 类型参数命名指引
采用描述性名称命名泛型，除非单字符自解释了并且描述性名称不会再增加意义
```C#
//   ./snippets/coding-conventions
public interface ISessionChannel<TSession>{/*...*/}
public delegate TOutput Converter<TInput,TOutput>(TInput from);
public class List<T>{/*...*/}
```
慎重使用T作为单字符类型参数的名称
```C#
//   ./snippets/coding-conventions
public int IComparer<T>(){return 0;}
public delegate bool Predicate<T>(T item);
public struct Nullable<T> where T:struct{/*...*/}
```
采用T作为类型参数名称的解释前缀
```C#
//   ./snippets/coding-conventions
public interface ISessionChannel<TSession>
{
    TSession Session{get;}
}
```
有点拗口 等理解加深了再翻译
Consider indicating constraints placed on a type parameter in the name of parameter. For example, a parameter constrained to ISession might be called TSession.
## 额外的命名约定
Examples that don't include using directives, use namespace qualifications. If you know that a namespace is imported by default in a project, you don't have to fully qualify the names from that namespace. Qualified names can be broken after a dot (.) if they're too long for a single line, as shown in the following example.
```C#
var currentPerformanceCounterCategory = new System.Diagnostics.
    PerformanceCounterCategory();
```
You don't have to change the names of objects that were created by using the Visual Studio designer tools to make them fit other guidelines.