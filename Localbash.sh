set -e
cd /c/Users/91832/StoreX.Backup/Storex_Clinet-Backup

node demotest.js
npm run build 

Commit_Message=$1

git add .

git commit -m $Commit_Message

git push
  