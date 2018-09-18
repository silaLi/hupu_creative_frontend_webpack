gitFidderPath="/Users/$USER/"
fidderPath="vipabc/landingpage/h5"
# need reset
fidderName="xxx_voting/"
distFidderPath="$gitFidderPath$fidderPath$fidderName"

echo "$distFidderPath"
rm -rf "$distFidderPath"
mkdir "$distFidderPath"

cp -a ./dist/ "$distFidderPath"