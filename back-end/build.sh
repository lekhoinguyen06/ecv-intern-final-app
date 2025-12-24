# Build front-end and move static file
cd ~/ecv-intern-final-app/front-end
pnpm run build
cp -r ./out/* ~/ecv-intern-final-app/back-end/src/client/

# Build server 
cd ~/ecv-intern-final-app/back-end
pnpm run lint
pnpm run build

# Commit to remote repository when -m tag is given
cd ~/ecv-intern-final-app/
while getopts "m:" opt; do
  case $opt in
    m) COMMIT_MESSAGE="$OPTARG" ;;
    *) echo "Usage: $0 [-m \"commit message\"]"; exit 1 ;;
  esac
done

if [ -n "$COMMIT_MESSAGE" ]; then
  git add . 
  git commit -m "$COMMIT_MESSAGE"
  git push
fi

