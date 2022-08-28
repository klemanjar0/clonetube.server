import * as bcrypt from 'bcryptjs';

export const hash = (data: string) => {
  return new Promise<string>((resolve, reject) => {
    bcrypt.hash(data, 10, (err, hash) => {
      if (err) {
        reject(err);
      } else {
        resolve(hash);
      }
    });
  });
};
