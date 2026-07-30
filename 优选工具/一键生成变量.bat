@echo off
chcp 65001 >nul
title 优选工具 - 一键生成变量并复制到剪贴板
cd /d "%~dp0"
echo ============================================
echo   优选工具 - 自动生成变量并复制到剪贴板
echo ============================================
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
echo [信息] 运行脚本: 自动生成变量导入cf.py
echo.

%PYTHON% "自动生成变量导入cf.py"

echo.
echo ============================================
echo   完成！配置已复制到剪贴板。
echo   worker.env 文件已生成在当前目录。
echo ============================================
echo.
pause