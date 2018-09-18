export default function MixImage(mixArr, completeBack){
  
  const cvs = document.createElement("canvas");
  const ctx = cvs.getContext("2d");

  cvs.width = mixArr[0].container.width
  cvs.height = mixArr[0].container.height
  
  for (let index = 0; index < mixArr.length; index++) {
    mixArr[index].loaded = false;

    const img = document.createElement("img");
    img.setAttribute("js-index", index)
    img.onload = imageItemLoaded;
    img.src = mixArr[index].url;

    mixArr[index].img = img;
  }


  function imageItemLoaded() {
    let img = this;
    let index = img.getAttribute("js-index");
    let mix = mixArr[index];
    mix.loaded = true;

    img.width = mix.argu[2]
    img.height = mix.argu[3]
    let noComplete = mixArr.find(item => {
      return item.loaded !== true;
    })
    if(noComplete === undefined){
      loadComplete();
    }
  }

  function loadComplete(){
    for (let index = 0; index < mixArr.length; index++) {
      const mix = mixArr[index];
      ctx.drawImage(...[mix.img, ...mix.argu])
    }
    const base64 = cvs.toDataURL("image/jpeg");
    completeBack(base64);
  }
}