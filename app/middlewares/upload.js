const multer = require("multer");
const path = require("path");

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "images");
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname));
//   },
// });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});


const fileFilter = (req, file, cb) => {
  const fileTypes = /jpeg|jpg|png|gif|webp/;
  const mimeType = fileTypes.test(file.mimetype);
  const extname = fileTypes.test(path.extname(file.originalname));
  if (mimeType && extname) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Invalid file format. Supported formats: jpeg, jpg, png, gif, webp"
      )
    );
  }
};



const singleUpload = multer({
  storage: storage,
  limits: { fileSize: 5000000 }, // 5 MB limit
  fileFilter: fileFilter,
}).single("image");

const doubleUpload = multer({
  storage: storage,
  limits: { fileSize: 5000000 }, // 5 MB limit
  fileFilter: fileFilter,
}).fields([
  { name: "image1", maxCount: 1 },
  { name: "image2", maxCount: 1 },
]);

const tripleUpload = multer({
  storage: storage,
  limits: { fileSize: 5000000 }, // 5 MB limit
  fileFilter: fileFilter,
}).fields([
  { name: "image1", maxCount: 1 },
  { name: "image2", maxCount: 1 },
  { name: "image3", maxCount: 1 },
]);


const quadrupleUpload = multer({
  storage: storage,
  limits: { fileSize: 5000000 }, // 5 MB limit
  fileFilter: fileFilter,
}).fields([
  { name: "image1", maxCount: 1 },
  { name: "image2", maxCount: 1 },
  { name: "image3", maxCount: 1 },
  { name: "image4", maxCount: 1 },
]);




const quintupleUpload = multer({
  storage: storage,
  limits: { fileSize: 5000000 }, // 5 MB limit
  fileFilter: fileFilter,
}).fields([
  { name: "image1", maxCount: 1 },
  { name: "image2", maxCount: 1 },
  { name: "image3", maxCount: 1 },
  { name: "image4", maxCount: 1 },
  { name: "image5", maxCount: 1 },
]);

const sextupleeUpload = multer({
  storage: storage,
  limits: { fileSize: 5000000 }, // 5 MB limit
  fileFilter: fileFilter,
}).fields([
  { name: "image1", maxCount: 1 },
  { name: "image2", maxCount: 1 },
  { name: "image3", maxCount: 1 },
  { name: "image4", maxCount: 1 },
  { name: "image5", maxCount: 1 },
  { name: "image6", maxCount: 1 },
]);

const twelveUpload = multer({
  storage: storage,
  limits: { fileSize: 5000000 }, // 5 MB limit
  fileFilter: fileFilter,
}).fields([
  { name: "image1", maxCount: 1 },
  { name: "image2", maxCount: 1 },
  { name: "image3", maxCount: 1 },
  { name: "image4", maxCount: 1 },
  { name: "image5", maxCount: 1 },
  { name: "image6", maxCount: 1 },
  { name: "image7", maxCount: 1 },
  { name: "image8", maxCount: 1 },
  { name: "image9", maxCount: 1 },
  { name: "image10", maxCount: 1 },
  { name: "image11", maxCount: 1 },
  { name: "image12", maxCount: 1 },
]);

module.exports = {
  singleUpload,
  doubleUpload,
  tripleUpload,
  quadrupleUpload,
  quintupleUpload,
  sextupleeUpload,
  twelveUpload
};
