while getopts "m:fpbah" opt; do
  case $opt in
    m) 
      SHOULD_COMMIT=true
      COMMIT_MESSAGE="$OPTARG"
      ;;
    b) BUILD_BACKEND=true ;;
    f) BUILD_FRONTEND=true ;;
    p) SHOULD_PUSH=true ;;
    a)
      BUILD_BACKEND=true
      BUILD_FRONTEND=true
      SHOULD_COMMIT=true
      SHOULD_PUSH=true
      ;;
    h)
      echo "Usage: $0"
      echo "[-m \"message\" to commit]"
      echo "[-f to build frontend]"
      echo "[-b to build backend]"
      echo "[-p to push to remote]"
      echo "[-a to do all (build frontend, build backend, commit, push)]"
      echo "[-h to show this help]"
      exit 0
      ;;
    *)
      echo "Usage: $0 -h for help"
      exit 1
      ;;
  esac
done

if [ "$BUILD_FRONTEND" = true ]; then
  cd ./front-end
  pnpm run build
  cp -r ./out/* ../back-end/client/
  cd ../
fi

if [ "$BUILD_BACKEND" = true ]; then
  cd ./back-end
  pnpm run lint
  pnpm run build
  cd ../
fi

if [ "$SHOULD_COMMIT" = true ]; then
  COMMIT_MESSAGE="${COMMIT_MESSAGE:-"Automated commit"}"
  git add .
  git commit -m "$COMMIT_MESSAGE"
fi

if [ "$SHOULD_PUSH" = true ]; then
  git push
fi