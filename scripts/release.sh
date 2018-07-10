read -p "INPUT YOUR COMMIT DESCRIPTION: " inputCommit
commit="faq - 体验课流程"
if [ "$inputCommit" != "" ]
then
  commit+=" -> $inputCommit"
fi

echo "GIT COMMIT IS : $commit"

gitFidderPath="/Users/$USER/vipabc/Vpage/"
fidderPath="landingpage/faq/"
fidderName="class-type/"
distFidderPath="$fidderPath$fidderPath$fidderName"

rm -rf "$distFidderPath"
mkdir "$distFidderPath"
cp -a ./dist/ "$distFidderPath"
cd "$gitFidderPath"
git pull
git add "$fidderPath$fidderName"

git commit -m "$commit"
git push