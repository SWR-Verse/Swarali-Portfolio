@echo off
title Swarali Portfolio - Local Dev Server
cd /d "%~dp0"
set "LOG=dev-server.log"

echo ============================================================
echo   Swarali Portfolio - starting up
echo ============================================================
echo.
echo   Everything is being written to dev-server.log
echo   Leave this window open. Do NOT click inside it.
echo.

> "%LOG%" echo ===== DIAGNOSTICS =====
>>"%LOG%" echo Folder: %CD%
>>"%LOG%" echo.
>>"%LOG%" echo --- node ---
where node   >>"%LOG%" 2>&1
node -v      >>"%LOG%" 2>&1
>>"%LOG%" echo --- npm ---
where npm    >>"%LOG%" 2>&1
call npm -v  >>"%LOG%" 2>&1
>>"%LOG%" echo --- who is holding ports 3000-3001 ---
netstat -ano ^| findstr ":3000 :3001" >>"%LOG%" 2>&1
>>"%LOG%" echo --- node_modules present? ---
if exist "node_modules\next\package.json" (>>"%LOG%" echo yes) else (>>"%LOG%" echo NO - dependencies missing)
>>"%LOG%" echo.
>>"%LOG%" echo ===== DEV SERVER =====

echo   Starting... watch for a URL below.
echo.

call npm run dev >>"%LOG%" 2>&1

echo.
echo ============================================================
echo   The server stopped. dev-server.log has the reason.
echo ============================================================
pause
