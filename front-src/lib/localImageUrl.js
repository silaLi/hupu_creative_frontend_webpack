import { EXIF } from "exif-js";

export function LoadImageUrl(imageHTMLElement, handler) {
  var debug = false;
  EXIF.getData(imageHTMLElement, function () {
    
    var orientation = EXIF.getTag(this, "Orientation");
    var img_height = EXIF.getTag(this, "PixelYDimension");
    var img_width = EXIF.getTag(this, "PixelXDimension");

    var canvas_height = img_height;
    var canvas_width = img_width;

    // 是否需要翻转图片
    var ReverseImageMark = false;
    // 是否需要canvas绘制图片
    var CanvasDrawMark = false;
    // 旋转度数 90: 90度
    var RotateDeg = 0;

    // 图片orientation示意
    // http://104.194.64.126/images/6cJTP.gif
    if (debug) console.log(orientation);
    
    if (orientation == 1) {

    } else if (orientation == 2) {
      ReverseImageMark = true;
      CanvasDrawMark = true;

    } else if (orientation == 3) {
      CanvasDrawMark = true;

      RotateDeg = 180;
      canvas_height = img_height;
      canvas_width = img_width;

    } else if (orientation == 4) {
      ReverseImageMark = true;
      CanvasDrawMark = true;

      RotateDeg = 180;
      canvas_height = img_height;
      canvas_width = img_width;

    } else if (orientation == 5) {
      ReverseImageMark = true;
      CanvasDrawMark = true;

      RotateDeg = 90;
      canvas_height = img_width;
      canvas_width = img_height;

    } else if (orientation == 6) {
      CanvasDrawMark = true;

      RotateDeg = 90;
      canvas_height = img_width;
      canvas_width = img_height;

    } else if (orientation == 7) {
      ReverseImageMark = true;
      CanvasDrawMark = true;

      RotateDeg = -90;
      canvas_height = img_width;
      canvas_width = img_height;

    } else if (orientation == 8) {
      CanvasDrawMark = true;

      RotateDeg = -90;
      canvas_height = img_width;
      canvas_width = img_height;
    }

    // 初始化功能对象
    var img = document.createElement('img');
    var ca1 = document.createElement('canvas');
    var c1 = ca1.getContext("2d");
    var fileUrl = imageHTMLElement.src;

    if (debug) console.log(orientation)
    if (CanvasDrawMark) {
      CanvasDraw(fileUrl);
    } else {
      next(fileUrl);
    }

    function CanvasDraw(tempUrl) {
      ca1.height = canvas_height;
      ca1.width = canvas_width;
      img.src = tempUrl;

      img.onload = function () {
        c1.translate(canvas_width / 2, canvas_height / 2);
        c1.rotate(RotateDeg * Math.PI / 180);

        if (Math.abs(RotateDeg) == 180) {
          c1.drawImage(this, -canvas_width / 2 * 1, -canvas_height / 2 * 1, img_width, img_height);
        } else if (Math.abs(RotateDeg) == 90) {
          c1.drawImage(this, -canvas_height / 2, -canvas_width / 2, img_width, img_height);
        }
        c1.save();
        // 左右镜面翻转图片
        if (ReverseImageMark) {
          ReverseImage();
        }

        var img_url = dataURLtoBlob(ca1.toDataURL("image/jpeg"));

        next(getObjectURL(img_url));
      };
    }

    function next(url) {
      typeof handler == 'function' && handler(url);
    }

    function ReverseImage() {
      // 获取 img_data 数据
      var img_data = c1.getImageData(0, 0, ca1.width, ca1.height),
        i, i2, t,
        h = img_data.height,
        w = img_data.width,
        w_2 = w / 2;
      // 将 img_data 的数据水平翻转
      for (var dy = 0; dy < h; dy++) {
        for (var dx = 0; dx < w_2; dx++) {
          i = (dy << 2) * w + (dx << 2)
          i2 = ((dy + 1) << 2) * w - ((dx + 1) << 2)
          for (var p = 0; p < 4; p++) {
            t = img_data.data[i + p]
            img_data.data[i + p] = img_data.data[i2 + p]
            img_data.data[i2 + p] = t
          }
        }
      }
      // 重绘水平翻转后的图片
      c1.putImageData(img_data, 0, 0)
    }
  });

  function dataURLtoBlob(dataurl) {
    var arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {
      type: mime
    });
  }

  function getObjectURL(file) {
    var url = null;
    if (window.createObjectURL !== undefined) { // basic
      url = window.createObjectURL(file);
    } else if (window.URL !== undefined) { // mozilla(firefox)
      url = window.URL.createObjectURL(file);
    } else if (window.webkitURL !== undefined) { // webkit or chrome
      url = window.webkitURL.createObjectURL(file);
    }
    return url;
  }
}