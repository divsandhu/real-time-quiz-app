@echo off
echo Starting AptitudeArena...
echo.

echo Starting Server...
start "AptitudeArena Server" cmd /k "cd server && npm start"

echo Waiting for server to start...
timeout /t 3 /nobreak > nul

echo Starting Client...
start "AptitudeArena Client" cmd /k "cd client && npm run dev"

echo.
echo AptitudeArena started successfully!
echo Server: http://localhost:5000
echo Client: http://localhost:5173
echo.
echo Press any key to exit...
pause > nul

