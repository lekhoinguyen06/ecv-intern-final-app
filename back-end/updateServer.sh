cd ~/ecv-intern-final-app/
git reset --hard
git pull origin hung
bash ./build.sh -f -b
cd ./back-end
pnpm install
pnpm run build
# pnpm run test:e2e
pnpm run start:prod