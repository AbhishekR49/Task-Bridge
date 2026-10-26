const multer = require('multer');
const { fileTypeFromBuffer } = require('file-type');

const alloweTypes = ['application/pdf',
     "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

const uploadResume = multer({
    storage:multer.memoryStorage(),

    limits:{
        fileSize:5*1024*1024,  //5 Mb
        files:1
    },

    fileFilter: (req, file, cb)=>{
        if(!alloweTypes.includes(file.mimetype)){
           return cb(
            new Error("Resume accept only in pdf and docx") );
        }
        cb(null, true);
    }
});

const validateResume = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Resume file is required.",
      });
    }

    const { fileTypeFromBuffer } = await import("file-type");
    const detected = await fileTypeFromBuffer(req.file.buffer);

    if (
      !detected ||
      !["pdf", "zip"].includes(detected.ext)
    ) {
      return res.status(400).json({
        success: false,
        message: "The resume must contain a valid PDF or DOCX file.",
      });
    }

    if (
      (req.file.mimetype === "application/pdf" && detected.ext !== "pdf") ||
      (req.file.mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" &&
        detected.ext !== "zip")
    ) {
      return res.status(400).json({
        success: false,
        message: "File contents do not match the declared file type.",
      });
    }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {uploadResume, validateResume};