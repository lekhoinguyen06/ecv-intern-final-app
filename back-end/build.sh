# Go to root
cd ../

# Process options
while getopts "m:fp" opt; do
  case $opt in
    m) COMMIT_MESSAGE="$OPTARG" ;;
    f)
      cd ./front-end
      pnpm run build
      cp -r ./out/* ../back-end/client/
      cd ../
      ;;
    p) SHOULD_PUSH=true ;;
    *) 
      echo "Usage: $0" 
      echo "[-m \"message\" to commit]";
      echo "[-f to build frontend]";
      echo "[-p to push to remote]";
      exit 1 
      ;;
  esac
done

# Build server 
cd ./back-end
pnpm run lint
pnpm run build
cd ../

# Commit
if [ -n "$COMMIT_MESSAGE" ]; then
  git add .
  git commit -m "$COMMIT_MESSAGE"
fi

if [ "$SHOULD_PUSH" = true ]; then
  git push
fi

