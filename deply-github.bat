# `deploy-github.bat`

# 当发生错误时中止脚本
set -e

# 构建
npm run build

# cd 到构建输出的目录下 
cd dist

git init
git add --all
git commit -m 'deploy github'

git remote add origin https://github.com/watchping/xzvue-pc.git

# 部署到 https://<USERNAME>.github.io/<REPO>
git push -f origin master:gh-pages

cd ..