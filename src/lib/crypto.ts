import { AES, enc } from 'crypto-ts';
import { SECRET_KEY } from './service';

export const encryptData = (data: unknown) => {
  return AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
};

export const decryptData = (data: string) => {
  const bytes = AES.decrypt(data, SECRET_KEY);
  return JSON.parse(bytes.toString(enc.Utf8));
};
