set -e
cd /c/Users/91832/StoreX.Backup/Storex_Clinet-Backup
node demotest.js
npm run build 

aws s3 sync ./dist s3://sanat08-frontend-deployment --delete --profile sanat08


aws cloudfront create-invalidation --distribution-id E2YZHDHRG7WTPW --paths "/*" --profile sanat08


# commands for the client side 
