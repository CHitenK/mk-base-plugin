rm -rf dist &&
npm run build &&
cd dist &&
git init &&
git add . &&
git commit -m 'updated by shell' &&
git branch -M master &&
git remote add origin https://github.com/coderben2017/vv-ui-plus.git &&
git push -f -u origin master &&
echo https://coderben2017.github.io/vv-ui-plus/index.html