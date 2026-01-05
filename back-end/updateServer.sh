echo -e "\n\033[1m▶ 🌀 Cloing project...\033[0m"
cd ~/ecv-intern-final-app/
git reset --hard
git pull origin main

echo -e "\n\033[1m▶ 📦 Installing dependencies...\033[0m"
cd ./back-end
pnpm install
cd ../

cd ./front-end
pnpm install
cd ../

echo -e "\n\033[1m▶ 🏗️ Building apps...\033[0m"
bash ./build.sh -f -b

cd ./back-end
pnpm run start:prod