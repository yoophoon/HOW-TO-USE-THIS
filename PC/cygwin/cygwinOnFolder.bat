@REM use [b2e](https://github.com/tokyoneon/B2E) to hide zhe flash window
@REM cygpath和mintty可能都需要重新设置
@REM @echo off
for /f "usebackq tokens=*" %%i in (`C:\cygwin64\bin\cygpath.exe %1`) do set tempdir=%%i
C:\cygwin64\bin\mintty.exe -i /Cygwin-Terminal.ico --dir %tempdir%
echo %tempdir%
pause