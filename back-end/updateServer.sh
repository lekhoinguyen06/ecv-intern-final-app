echo -m "🌀 Cloing project..."
cd ~/ecv-intern-final-app/
git reset --hard
git pull origin main

echo -m "📦 Installing dependencies..."
cd ./back-end
pnpm install
cd ./front-end
pnpm install

echo -m "🏗️ Building apps..."
bash ./build.sh -f -b

cd ./back-end
pnpm run start:prod