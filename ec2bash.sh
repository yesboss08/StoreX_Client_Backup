set -e

cd /home/ubuntu/StoreX_Client_Backup
git pull

node demotest.js


aws s3 sync ./dist s3://sanat08-frontend-deployment --delete 


aws cloudfront create-invalidation --distribution-id E2YZHDHRG7WTPW --paths "/index.html"