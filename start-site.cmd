@echo off
setlocal
cd /d "%~dp0"
where py >nul 2>nul
if %errorlevel%==0 (
  start "" http://127.0.0.1:8787/
  py -m http.server 8787
) else (
  where python >nul 2>nul
  if %errorlevel%==0 (
    start "" http://127.0.0.1:8787/
    python -m http.server 8787
  ) else (
    echo Python was not found. You can still open index.html directly.
    pause
  )
)
endlocal
