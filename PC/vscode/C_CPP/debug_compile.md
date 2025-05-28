# 设置C/C++环境
## 插件
```extensions.json
{
    "recommendations":[
        "C/C++",                    //只能提示、调试及浏览代码
        "C/C++ Extension Pack",     //扩展包，包含C/C++,C/C++ Themes,CMake Tools
    ]
}
```

## 编译器
[mingw](https://www.mingw-w64.org/) 
[mingw-w64-builds](https://github.com/niXman/mingw-builds-binaries/releases)

## 调试器
[参考文章](https://tocry.cn/index.php/archives/8/#cl-13)，文章提到的setting.json
实际上为针对工作去的设置，内容可参考，一般无需设置：
```setting.json
{
    //规定clangd的位置，这是解决clangd无法被识别的最终方案
    "clangd.path": "C:\\msys64\\ucrt64\\bin\\clangd.exe",
    "clangd.arguments": [
        //如果使用万能头文件，可以屏蔽掉插入头文件的操作
        //"--header-insertion=never",
    ],
    //cph和浏览器插件联动的效果
    // "cph.general.defaultLanguage": "cpp",
    // "cph.language.cpp.SubmissionCompiler": "GNU G++14 6.4.0", // 使用 C++14 标准
    // "cph.language.cpp.Args": "-std=c++14 -O2", // -O2

    //这里规定了CodeRunner一键生成的命令
    "code-runner.executorMap": {
        //这里默认c++文件用c++14标准编译，可以自己选是什么版本的，如果要c++23，那么就写-std=c++23即可
        //"cpp": "cd $dir && clang++ $fileName -o $fileNameWithoutExt && $dir$fileNameWithoutExt",
        "cpp": "cd $dir && clang++ -std=c++14 $fileName -o $fileNameWithoutExt && $dir$fileNameWithoutExt",
        "c": "cd $dir && clang $fileName -o $fileNameWithoutExt && $dir$fileNameWithoutExt",
        "python": "python -u",
    },
    //这两行分别是指示代码和终端的字体大小
    "editor.fontSize": 22,
    "terminal.integrated.fontSize": 20,

    "code-runner.runInTerminal": true, //是否在终端中运行，选择是

    //下面是美化功能，美化完以后可以使用
    // "editor.mouseWheelZoom": false, //是否可以让代码字体用CTRL+滚轮进行缩放，true就是可以
    // "terminal.integrated.mouseWheelZoom": true, //是否可以让终端字体用CTRL+滚轮进行缩放，true就是可以
    // "terminal.integrated.fontFamily": "CaskaydiaMono Nerd Font", //重要！！请和你刚才设置的字体一致
    // "terminal.integrated.defaultProfile.windows": "PowerShell", //选择默认哪个终端打开编译
}
```
vscode是支持[dap](https://microsoft.github.io/debug-adapter-protocol/)
dap的基本配置文件为launch.json，示例内容如下：
```launch.json
{
    "version": "0.2.0",
    "configurations": [
        {
            "name": "clang++ build and debug active file",
            "type": "lldb",
            "request": "launch",
            //fileBasenameNoExtension表示当前打开的文件的文件名，但不包括文件扩展名
            //例如，如果当前打开的文件是 example.cpp，那么 fileBasenameNoExtension 的值将是 example
            "program": "${fileDirname}/${fileBasenameNoExtension}.exe",
            "args": [],
            //cwd用于指定当前工作目录
            //如果当前打开的是一个文件夹，${workspaceFolder} 就是这个文件夹的路径
            "cwd": "${workspaceFolder}",
            "preLaunchTask": "clang++ build" //这个名字需要和tasks.json的label名一致
        }
    ]
}
```
启动调试进程的tasks.json，可以忽略但有其他需求可配置，示例内容如下：
```tasks.json
{
    "version": "2.0.0",
    "tasks": [
        {
            //这个名字需要和launch.json的preLaunchTask名一致
            "label": "clang++ build",
            "type": "shell",
            "command": "clang++", //使用什么命令
            //命令的参数
            "args": [
                "-std=c++14",  // 指定 C++14 标准，可以自己选是什么版本的，如果要c++23，那么就写-std=c++23即可
                "-Wall",       // 打开所有警告
                "${fileDirname}\\${fileBasename}", //源文件名,在工作区的任何文件夹中都能使用
                "-o",            // 编译输出
                "${fileDirname}\\${fileBasenameNoExtension}.exe", //输出名，在工作区的任何文件夹中都能使用
                "-g"           // 带调试信息
            ],
            //下面参数对于单文件意义不大
            "group": {
                //表示这个任务属于 构建组（build group）。构建组的任务通常用于编译或构建项目。
                "kind": "build",
                //表示这个任务是其所属组（这里是 build 组）的 默认任务。
                "isDefault": true
            }
        }
    ]
}
```
