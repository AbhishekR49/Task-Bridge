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
        fileName:`${fileId}.${ file.mimetypes === 'application/pdf' ? 'pdf': 'docx'}` ,

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

module.exports ={ uploadResumeToImageKit, deleteResumeFromImagekit}