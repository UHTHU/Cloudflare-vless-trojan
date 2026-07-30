@echo off
chcp 65001 >nul
title 优选工具 - 一键生成变量并复制到剪贴板
cd /d "%~dp0"
echo ============================================
echo   优选工具 - 自动生成变量并复制到剪贴板
echo ============================================
echo.

for /f "tokens=2 delims==" %%I in ('wmic os get localdatetime /value 2^>nul') do set "dt=%%I"
if defined dt (
    set "YYYY=%dt:~0,4%"
    set "MM=%dt:~4,2%"
    set "DD=%dt:~6,2%"
) else (
    set "YYYY=%date:~0,4%"
    set "MM=%date:~5,2%"
    set "DD=%date:~8,2%"
)
set "DATE_FMT=%YYYY%_%MM%-%DD%"
echo [步骤1] 今日日期: %DATE_FMT%
echo.

echo [步骤2] 创建日期文件夹...
if not exist "ip\History\%DATE_FMT%" mkdir "ip\History\%DATE_FMT%"
if not exist "domain\History\%DATE_FMT%" mkdir "domain\History\%DATE_FMT%"
if not exist "ip\ipv4" mkdir "ip\ipv4"
if not exist "ip\ipv6" mkdir "ip\ipv6"
echo [信息] 文件夹已就绪
echo.

echo [步骤3] 收集优选结果并放入历史文件夹...
set "COPIED=0"

if exist "ip\ipv4\*.csv" (
    for /f "delims=" %%F in ('dir /b /o-d /a-d "ip\ipv4\*.csv" 2^>nul') do (
        copy /y "ip\ipv4\%%F" "ip\History\%DATE_FMT%\result.csv" >nul
        echo [信息] IPv4: 复制 "%%F" -> ip\History\%DATE_FMT%\result.csv
        set "COPIED=1"
        goto :ipv4_done
    )
)
:ipv4_done

if not exist "ip\History\%DATE_FMT%\result.csv" (
    echo [警告] ip\ipv4\ 中未找到 IPv4 结果文件，将使用默认值
)

if exist "ip\ipv6\*.csv" (
    for /f "delims=" %%F in ('dir /b /o-d /a-d "ip\ipv6\*.csv" 2^>nul') do (
        copy /y "ip\ipv6\%%F" "ip\History\%DATE_FMT%\result_v6.csv" >nul
        echo [信息] IPv6: 复制 "%%F" -> ip\History\%DATE_FMT%\result_v6.csv
        set "COPIED=1"
        goto :ipv6_done
    )
)
:ipv6_done

if not exist "ip\History\%DATE_FMT%\result_v6.csv" (
    echo [提示] ip\ipv6\ 中未找到 IPv6 结果文件，将使用纯IPv4模式
)

if exist "domain\*.txt" (
    for /f "delims=" %%F in ('dir /b /o-d /a-d "domain\*.txt" 2^>nul') do (
        copy /y "domain\%%F" "domain\History\%DATE_FMT%\CDNym.txt" >nul
        echo [信息] 域名: 复制 "%%F" -> domain\History\%DATE_FMT%\CDNym.txt
        set "COPIED=1"
        goto :dom_done
    )
)
:dom_done

if not exist "domain\History\%DATE_FMT%\CDNym.txt" (
    echo [警告] domain\ 中未找到域名结果文件，将使用默认值
)

echo.
echo [步骤4] 运行变量生成脚本...
echo.

where python >nul 2>nul (
    set "PYTHON=python"
) || (
    where pythonw >nul 2>nul (
        set "PYTHON=pythonw"
    ) || (
        if exist "C:\Python311\python.exe" (
            set "PYTHON=C:\Python311\python.exe"
        ) else if exist "C:\Python310\python.exe" (
            set "PYTHON=C:\Python310\python.exe"
        ) else if exist "C:\Python39\python.exe" (
            set "PYTHON=C:\Python39\python.exe"
        ) else if exist "C:\Python38\python.exe" (
            set "PYTHON=C:\Python38\python.exe"
        ) else (
            echo [错误] 未找到 Python 解释器！
            echo 请先安装 Python 3.8+ 并确保已添加到 PATH。
            echo.
            pause
            exit /b 1
        )
    )
)

echo [信息] 使用 Python: %PYTHON%
%PYTHON% "自动生成变量导入cf.py"

echo.
echo ============================================
echo   完成！配置已复制到剪贴板。
echo   worker.env 文件已生成在当前目录。
echo ============================================
echo.
pause