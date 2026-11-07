const Imagekit = require('imagekit');
const crypto = require('crypto');

const imageKitClient = new Imagekit({
    publicKey: process.env.IK_PUBLIC_KEY,
    privateKey: process.env.IK_PRIVATE_KEY,
    urlEndpoint: process.env.IK_URL,
});

const uploadResumeToImageKit = async(file)=>{

    if(!file || !file.buffer){
        throw new Error('Resume file is required');
    }

    const fileId = crypto.randomUUID();

    const uploadFile =await imageKitClient.upload({
        file: file.buffer,
        fileName:`${fileId}.${ file.mimetype === 'application/pdf' ? 'pdf': 'docx'}` ,

        folder:"/task-bridge/resumes",
        useUniqueFileName:false,
        isPrivateFile:true
    });

    return{
        storageKey: uploadFile.fileId,
        originalName: file.originalname
    }
}

const deleteResumeFromImagekit = async(fileId)=>{
    if(!fileId) return;

    await imageKitClient.deleteFile(fileId);
};


const getResumeAccessUrl = async (fileId) => {
  if (!fileId) {
    throw new Error("Resume file ID is required");
  }

  // Retrieve file metadata using ImageKit's fileId.
  const fileDetails = await imageKitClient.getFileDetails(fileId);

  if (!fileDetails?.filePath) {
    throw new Error("Resume file path not found");
  }

  // Generate a signed URL that expires in 5 minutes.
  const url = imageKitClient.url({
    path: fileDetails.filePath,
    signed: true,
    expireSeconds: 300
  });

  return url;
};


module.exports ={ uploadResumeToImageKit, deleteResumeFromImagekit, getResumeAccessUrl};