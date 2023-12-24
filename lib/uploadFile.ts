import AWS from 'aws-sdk';

export async function fileUploader(selectedFiles: FileList | null): Promise<any[]> {
    if (!selectedFiles) {
        throw new Error('No files selected.');
    }

    const s3 = new AWS.S3({
        accessKeyId: process.env.NEXT_PUBLIC_AWS_BUCKET_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.NEXT_PUBLIC_AWS_BUCKET_SECRET_ACCESS_KEY || '',
        region: process.env.NEXT_PUBLIC_AWS_BUCKET_REGION || ''
    });
  
    const promises: Promise<any>[] = [];
    Array.from(selectedFiles).forEach((file) => {
        const params = {
            Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME || '',
            Key: `${Date.now()}_${file.name}`,
            Body: file,
            ACL: 'public-read'
        };

        const uploadPromise = s3.upload(params).promise();
        promises.push(uploadPromise);
    });

    try {
        const uploadedFiles = await Promise.all(promises);
        uploadedFiles.forEach((file) => {
            console.log('Uploaded File URL:', file.Location);
        });

        return uploadedFiles;
    } catch (error) {
        console.error('Error uploading files:', error);
        throw error;
    }
}
