require("dotenv").config();
import express from "express";
import multer from "multer";

//upload to s3
import { s3Upload } from "../../Utils/AWS/s3";

import { imageModel } from "../../database/images";
const router = express.Router();

//Multer configuration
const storage = multer.memoryStorage();
const upload = multer({ storage });

//AWS S3 configuration

router.post("/", upload.single("file"), async (req, res) => {
  try {
    const file = req.file;
    //s3 bucket options

    const bucketOptions = {
      Bucket: "zomato-clone-files",
      Key: file.originalname,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: "public-read",
    };

    const uploadImage = await s3Upload(bucketOptions);

    return res.status(200).json({ uploadImage });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

module.exports = router;
