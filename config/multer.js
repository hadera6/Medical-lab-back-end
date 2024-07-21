const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/userImages");
    },
    filename: (req, file, cb) => {
        username = req.body.username;
        ext = "jpg";
        fn = `user-${username}`
        cb(null, `${fn}.${ext}`);
    }
})
const filter = (req, file, cb) => {
    if (file.mimetype.startsWith("image"))
        cb(null, true);
    else
        cb(null, false);
}
module.exports = upload = multer({
    storage: storage,
    fileFilter: filter
})