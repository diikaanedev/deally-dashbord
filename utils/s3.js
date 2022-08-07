require('dotenv').config()
const fs = require('fs')
const S3 = require('aws-sdk/clients/s3');
const sharp = require('sharp');
const path = require('path');
const randomstring = require('randomstring');



const bucketName = process.env.AWS_BUCKET
const region = process.env.AWS_BUCKET_REGION
const accessKeyId = process.env.AWS_ACCESS_KEY
const secretAccessKey = process.env.AWS_SECRET_KEY

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey
})

// uploads a file to s3
const  uploadFile = async (file) =>  {

  const fileName = randomstring.generate();

  const fileStream = fs.createReadStream(file.path)

   await  sharp(fs.readFileSync(file.path)).resize(
      {
        height :  300,
        width : 300,
      }).
    toFormat('webp')
    .toFile(`uploads/${fileName}-300.webp`, (err, info) => {

        if (err) {
            console.log("err => ", err);
        }

        // console.log("info =>" , info);

    }).toBuffer().then(async b => {
      const uploadParams300 = {
        Bucket: bucketName,
        Body: b,
        Key: fileName+'-300.webp'
      };
      const a = await  s3.upload(uploadParams300).promise();
      const path ='uploads/'+fileName+'-300.webp';
      fs.unlinkSync(path);
      
    });

    await  sharp(fs.readFileSync(file.path)).resize(
      {
        height :  300,
        width : 300,
      }).
    toFormat('webp')
    .toFile(`uploads/${fileName}-180.webp`, (err, info) => {

        if (err) {
            console.log("err => ", err);
        }

        // console.log("info =>" , info);

    }).toBuffer().then(async b => {
      const uploadParams180 = {
        Bucket: bucketName,
        Body: b,
        Key:  'deally/'+ fileName+'-180.webp'
      };
      const a = await  s3.upload(uploadParams180).promise();
      const path ='uploads/'+fileName+'-180.webp';
      fs.unlinkSync(path);
    });

    await  sharp(fs.readFileSync(file.path)).resize(
      {
        height :  100,
        width : 100,
      }).
    toFormat('webp')
    .toFile(`uploads/${fileName}-100.webp`, (err, info) => {

        if (err) {
            console.log("err => ", err);
        }

        // console.log("info =>" , info);

    }).toBuffer().then(async b => {
      const uploadParams100 = {
        Bucket: bucketName,
        Body: b,
        Key: fileName+'-100.webp'
      };
      const a = await  s3.upload(uploadParams100).promise();
      const path ='uploads/'+fileName+'-100.webp';
      fs.unlinkSync(path);
    });

    

    const uploadParamsNormal = {
      Bucket: bucketName,
      Body: fileStream,
      Key: fileName+path.extname(file.path)
    };


    await  s3.upload(uploadParamsNormal).promise();

    fs.unlinkSync(file.path);

  return `https://cac-e-shop-by-intech.s3.amazonaws.com/deally/${fileName}-300.webp`;
}
exports.uploadFile = uploadFile


// downloads a file from s3
function getFileStream(fileKey) {
  const downloadParams = {
    Key: fileKey,
    Bucket: bucketName
  }

  return s3.getObject(downloadParams).createReadStream()
}
exports.getFileStream = getFileStream


