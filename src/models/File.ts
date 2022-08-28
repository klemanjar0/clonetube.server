import { Document } from 'mongoose';

export type FileDocument = Document;

export enum FileField {
  originalName = 'originalName',

  uploadedBy = 'uploadedBy',
}
