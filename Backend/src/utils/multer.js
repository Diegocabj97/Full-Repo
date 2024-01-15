import multer from "multer";

//Multer
const profPicsStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "src/public/js/profilePics");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${file.originalname}}`); //Fecha + nombre de la imagen
  },
});
const prodPicsStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "src/public/js/productPics");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${file.originalname}}`); //Fecha + nombre de la imagen
  },
});
const docsStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "src/public/js/documentsPics");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${file.originalname}`); //Fecha + nombre de la imagen
  },
});
export const Docs = multer({ storage: docsStorage });
export const ProfPics = multer({ storage: profPicsStorage });
export const prodPics = multer({ storage: prodPicsStorage });
