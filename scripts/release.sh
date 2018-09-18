read -p "INPUT YOUR COMMIT DESCRIPTION: " inputCommit
# need reset
commit="投票系统"
if [ "$inputCommit" != "" ]
then
  commit+=" -> $inputCommit"
fi

echo "GIT COMMIT IS : $commit"

gitFidderPath="/Users/$USER/vipabc/Vpage/"
fidderPath="landingpage/h5/"
# need reset
fidderName="xxx_voting/"
distFidderPath="$gitFidderPath$fidderPath$fidderName"


rm -rf "$distFidderPath"
mkdir "$distFidderPath"

cp -a ./dist/ "$distFidderPath"
cd "$gitFidderPath"
git pull
git add "$fidderPath$fidderName"

git commit -m "$commit"
git push