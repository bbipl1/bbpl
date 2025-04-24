// src/awsConfig.js

const AWSConfig = {
    accessKeyId: process.env.REACT_APP_ACCESS_KEY,      // Replace with your AWS Access Key
    secretAccessKey: process.env.REACT_APP_SECRECT_ACCESS_KEY,  // Replace with your AWS Secret Access Key
    region: process.env.REACT_APP_AWS_REGION || 'us-east-1',  // Replace with your AWS region
    bucketName: process.env.REACT_APP_AWS_BUCKET_NAME,        // Replace with your S3 bucket name
  };
  
  export { AWSConfig };
  