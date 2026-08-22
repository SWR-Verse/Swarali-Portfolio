@echo off
title Swarali Portfolio - Local Dev Server
cd /d "%~dp0"

echo ============================================================
echo   Swarali Portfolio - starting up
echo   Folder: %CD%
echo ============================================================
echo.

if not exist "node_modules\" (
  echo Installing dependencies - this takes a few minutes the first
  echo time. Lots of text will scroll by; that is normal.
  echo.
  call npm install
  if errorlevel 1 (
    echo.
    echo *** npm install failed. Screenshot this window and send it over. ***
    pause
    exit /b 1
  )
)

echo Starting the dev server...
echo.
echo   Once you see "Ready", open:
echo.
echo       http://localhost:3000/work
echo.
echo   Leave this window open while you work.
echo   Press Ctrl+C twice to stop the server.
echo.

call npm run dev

echo.
echo Server stopped.
pause
