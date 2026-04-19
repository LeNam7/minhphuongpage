const Jimp = require('jimp');

async function removeBg() {
  try {
    const image = await Jimp.read('public/images/logo.png');
    
    image.scan(0, 0, image.bitmap.width, image.bitmap.height, function(x, y, idx) {
      const r = this.bitmap.data[idx + 0];
      const g = this.bitmap.data[idx + 1];
      const b = this.bitmap.data[idx + 2];
      
      // Nếu pixel là màu gần trắng xóa (Mã HEX ~ #F0F0F0 đến #FFFFFF)
      if (r > 230 && g > 230 && b > 230) {
        this.bitmap.data[idx + 3] = 0; // Alpha = 0 (Trong suốt)
      } else if (r > 200 && g > 200 && b > 200) {
        // Pixel vùng viền (Khử răng cưa - Anti-aliasing)
        const distToWhite = Math.sqrt(Math.pow(255 - r, 2) + Math.pow(255 - g, 2) + Math.pow(255 - b, 2));
        this.bitmap.data[idx + 3] = Math.max(0, Math.min(255, distToWhite * 3));
      }
    });

    await image.writeAsync('public/images/logo_transparent.png');
    console.log("Xóa nền thành công!");
  } catch (error) {
    console.error("Lỗi xóa nền:", error);
  }
}

removeBg();
