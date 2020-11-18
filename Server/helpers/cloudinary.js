require("dotenv").config();
const { rejects } = require("assert");
const dataURI = require("datauri/parser");
const path = require("path");
const fs = require("fs");
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});
const dataUri = (file) => {
  const dUri = new dataURI();
  //file.buffer = undefined;
  return dUri.format(path.extname(file.originalname).toString(), file.buffer);
};
module.exports = {
  uploadSingle: (file) => {
    return new Promise((resolve) => {
      cloudinary.uploader
        .upload(
          file,
          {
            folder: "BookStore",
          },
          (error, result) => {
            if (error) {
              console.log("err cloudinary");
            }
            if (result) {
              const fs = require("fs");
              //xoa bo nho keo tran
              //fs.unlinkSync(file);
              console.log("upload thanh cong");
              resolve({
                url: result.secure_url,
              });
            }
          }
        )
        .then();
    });
  },
  uploadMultiple: (file) => {
    return new Promise((resolve) => {
      cloudinary.uploader
        .upload(file, {
          folder: "home",
        })
        .then((result) => {
          if (result) {
            const fs = require("fs");
            // fs.unlinkSync(file);
            resolve({
              url: result.secure_url,
              id: result.public_id,
              thumb1: self.reSizeImage(result.public_id, 200, 200),
              main: self.reSizeImage(result.public_id, 500, 500),
              thumb2: self.reSizeImage(result.public_id, 300, 300),
            });
          }
        });
    });
  },
  reSizeImage: (id, h, w) => {
    return cloudinary.url(id, {
      height: h,
      width: w,
      crop: "scale",
      format: "jpg",
    });
  },
  dataUri,
};
