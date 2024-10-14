import * as admin from 'firebase-admin';
import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import 'dotenv/config';

const firebaseConfig = JSON.parse(process.env.FIREBASE_ADMIN_SDK);


@Injectable()
export class FirebaseService {
  constructor() {
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert(firebaseConfig),
        storageBucket: 'gs://linkedin-285d2.appspot.com',
      });
    }
  }

  async uploadFile(file: Express.Multer.File): Promise<string> {
    try {
      const bucket = admin.storage().bucket();
      const fileName = `${uuidv4()}-${file.originalname}`;
      const filePath = `images/${fileName}`;
      const fileUpload = bucket.file(filePath);
      await fileUpload.save(file.buffer, {
        contentType: file.mimetype,
      });
      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${filePath}`;
      return publicUrl;
    } catch (error) {
      throw new Error('Failed to upload file');
    }
  }
}
