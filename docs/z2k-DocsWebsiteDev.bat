@echo off
cls
echo Welcome to the doc maintainer script. What would you like to do?
echo:
echo [1] - Run the Docusaurus Development Server
echo [2] - Open the local development server in a browser
echo [3] - Build a static website
echo [4] - Update Docusaurus
echo [5] - Deploy to GitHub Pages
echo:
set /p actionId=Which action do you want to take? : 
echo:
if %actionId%==1 (
npm run start
) else if %actionId%==2 (
start http://localhost:3000
) else if %actionId%==3 (
npm run build 
) else if %actionId%==4 (
start https://docusaurus.io/docs/installation
) else if %actionId%==5 (
npm deploy
)