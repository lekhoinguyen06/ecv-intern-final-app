cd ~/ecv-intern-final-app/
git reset --hard
git pull origin main
cd ./back-end
pnpm install
pnpm run build
pnpm run start:prod