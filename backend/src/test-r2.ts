import { S3Client, PutObjectCommand, ListObjectsV2Command } from '@aws-sdk/client-s3';
import dotenv from 'dotenv';
import path from 'path';

// Load env
dotenv.config();

const s3Client = new S3Client({
  region: 'auto',
  endpoint: process.env.R2_ENDPOINT || `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || '',
  },
});

async function testUpload() {
  const bucketName = process.env.R2_BUCKET_NAME || 'carbooking';
  const testKey = `test-upload-${Date.now()}.txt`;
  const content = 'Hello from Crown Wealth Admin! This is a test upload to Cloudflare R2.';

  console.log('🚀 Starting R2 Upload Test...');
  console.log(`📦 Bucket: ${bucketName}`);
  console.log(`🔑 Key: ${testKey}`);

  try {
    // 1. Test Upload
    const putCommand = new PutObjectCommand({
      Bucket: bucketName,
      Key: testKey,
      Body: content,
      ContentType: 'text/plain',
    });

    await s3Client.send(putCommand);
    console.log('✅ Upload Successful!');

    // 2. Test Listing
    console.log('🔍 Listing objects in bucket...');
    const listCommand = new ListObjectsV2Command({
      Bucket: bucketName,
      MaxKeys: 5,
    });
    const { Contents } = await s3Client.send(listCommand);
    
    console.log('📂 Objects found:');
    Contents?.forEach((obj) => {
      console.log(` - ${obj.Key} (${obj.Size} bytes)`);
    });

    console.log('\n✨ TEST PASSED: Your R2 is working perfectly!');
    console.log(`🔗 Access your file at: ${process.env.R2_PUBLIC_URL}/${testKey}`);

  } catch (error: any) {
    console.error('❌ TEST FAILED!');
    console.error('Error Message:', error.message);
    if (error.code === 'EntityTooLarge') {
      console.error('Hint: The file is too large.');
    } else if (error.name === 'InvalidAccessKeyId' || error.name === 'SignatureDoesNotMatch') {
      console.error('Hint: Check your Access Key ID and Secret Access Key in .env');
    }
  }
}

testUpload();
