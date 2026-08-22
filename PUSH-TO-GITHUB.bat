@echo off
REM ---------------------------------------------------------------
REM  Pushes the committed work to GitHub, which triggers the deploy.
REM  PowerShell can't see git on its PATH, so this finds git.exe
REM  directly. Double-click this file to run it.
REM ---------------------------------------------------------------
setlocal

cd /d "%~dp0"

set "GIT="
for %%P in (
  "C:\Program Files\Git\bin\git.exe"
  "C:\Program Files (x86)\Git\bin\git.exe"
  "%LOCALAPPDATA%\Programs\Git\bin\git.exe"
  "%LOCALAPPDATA%\GitHubDesktop\app-3.4.3\resources\app\git\cmd\git.exe"
) do if exist %%P set "GIT=%%~P"

if not defined GIT for /f "delims=" %%G in ('where git 2^>nul') do set "GIT=%%G"

if not defined GIT (
  echo.
  echo Could not find git.exe in the usual places.
  echo Open "Git Bash" from the Start menu and run:  git push origin main
  echo.
  pause
  exit /b 1
)

echo Using: %GIT%
echo.
echo Current status:
"%GIT%" status --short
echo.
echo Pushing to GitHub...
echo (If a sign-in window appears, sign in to GitHub and it will continue.)
echo.
"%GIT%" push origin main

echo.
if errorlevel 1 (
  echo ---------------------------------------------------------
  echo  Push did NOT succeed. Copy the message above and send it.
  echo ---------------------------------------------------------
) else (
  echo ---------------------------------------------------------
  echo  Pushed. Now open vercel.com to watch it deploy.
  echo ---------------------------------------------------------
)
echo.
pause
