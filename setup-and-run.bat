@echo off
echo ========================================
echo    STACKS MESSAGE BOARD SETUP
echo ========================================
echo.

echo [1/4] Installing backend dependencies...
npm install

echo.
echo [2/4] Running tests to verify smart contract...
npm test

echo.
echo [3/4] Setting up frontend...
cd frontend
npm install

echo.
echo [4/4] Starting frontend development server...
echo.
echo ========================================
echo    🎉 SETUP COMPLETE!
echo ========================================
echo.
echo 📱 Frontend will be available at: http://localhost:5173
echo.
echo 📋 Next steps:
echo 1. Deploy smart contract to testnet (see deploy-contract.md)
echo 2. Update contract address in frontend/src/App.tsx
echo 3. Connect your Leather wallet
echo 4. Start posting messages!
echo.
echo Press any key to start the frontend...
pause >nul

npm run dev 