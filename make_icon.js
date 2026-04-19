const Jimp = require('jimp');
const fs = require('fs');

async function createFavicon() {
  try {
    const image = await Jimp.read('public/images/logo_transparent.png');
    // Mở rộng ảnh thành hình vuông (thêm viền trong suốt nếu cần)
    const size = Math.max(image.bitmap.width, image.bitmap.height);
    
    // Tạo nền trong suốt hình vuông
    new Jimp(size, size, 0x00000000, async (err, bg) => {
      if (err) throw err;
      
      const x = (size - image.bitmap.width) / 2;
      const y = (size - image.bitmap.height) / 2;
      
      bg.composite(image, x, y);
      
      // Thu nhỏ mượt mà xuống 256x256 để làm icon
      bg.resize(256, 256, Jimp.RESIZE_BICUBIC);
      
      await bg.writeAsync('src/app/icon.png');
      console.log("Xử lý icon thành công: src/app/icon.png");

      // Xóa favicon mặc định của Next.js
      if (fs.existsSync('src/app/favicon.ico')) {
        fs.unlinkSync('src/app/favicon.ico');
        console.log("Đã xóa favicon.ico cũ.");
      }
    });
  } catch (err) {
    console.error(err);
  }
}

createFavicon();
