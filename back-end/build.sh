pnpm run lint
pnpm run build
cd ../

# Default tag message
TAG_MESSAGE="deploy-$(date +%Y%m%d%H%M%S)"

# Parse optional -m argument
while getopts "m:" opt; do
  case $opt in
    m) TAG_MESSAGE="$OPTARG"; COMMIT_MESSAGE="$OPTARG" ;;
    *) echo "Usage: $0 [-m \"commit/tag message\"]"; exit 1 ;;
  esac
done

git add . 
git commit -m "$COMMIT_MESSAGE"
git push
cd ./back-end/

