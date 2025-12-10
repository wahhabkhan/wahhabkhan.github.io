cd /d D:\Portfolio

:: Take ownership of the entire .git folder
takeown /F ".git" /R /D Y

:: Give full control recursively
icacls ".git" /reset /T /C
icacls ".git" /grant "%USERNAME%":F /T

:: Remove any leftover lock files
if exist ".git\index.lock" del /f /q ".git\index.lock"
if exist ".git\COMMIT_EDITMSG" del /f /q ".git\COMMIT_EDITMSG"
