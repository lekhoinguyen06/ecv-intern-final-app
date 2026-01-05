echo "🌀 Cloing project..."
cd ~/ecv-intern-final-app/
git reset --hard
git pull origin main

echo "📦 Installing dependencies..."
cd ./back-end
pnpm install
cd ../

cd ./front-end
pnpm install
cd ../

echo "🏗️ Building apps..."
bash ./build.sh -f -b

cd ./back-end
pnpm run start:prod