import path from 'path';
import fs from 'fs';
import { Request, Response, NextFunction } from 'express';
import multer, { FileFilterCallback, StorageEngine } from 'multer';
import { MulterEnvVars } from '../config/envConfig';
export class FileUploadService {
  private readonly upload_dir: string;
  private readonly max_size: number;
  private readonly envVars: MulterEnvVars;
  private readonly storage: StorageEngine;
  private readonly allowedExtensions = ['.png', '.jpg', '.jpeg', '.pdf', '.svg'];
  private readonly allowedMimeTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/svg+xml', 'application/pdf'];
  constructor() {
    this.envVars = new MulterEnvVars();
    this.upload_dir = this.envVars.get('UPLOAD_DIR');
    this.max_size = parseInt(this.envVars.get('MAX_FILE_SIZE'), 10);
    this.ensureUploadDirectory();
    this.storage = this.createStorageEngine();
  }
  private ensureUploadDirectory(): void {
    const fullPath = path.resolve(this.upload_dir);
    if (!fs.existsSync(fullPath)) {
      fs.mkdirSync(fullPath, { recursive: true });
    }
  }
  private createStorageEngine = (): StorageEngine => {
    return multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, this.upload_dir);
      },
      filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
      }
    });
  };
  private sanitizeFile = (file: Express.Multer.File, cb: FileFilterCallback) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const isAllowedExt = this.allowedExtensions.includes(ext);
    const isAllowedMime = this.allowedMimeTypes.includes(file.mimetype);

    if (isAllowedExt && isAllowedMime) {
      cb(null, true);
    } else {
      cb(new Error('File type not allowed.'));
    }
  };
  public upload = (): multer.Multer => {
    return multer({
      storage: this.storage,
      limits: { fileSize: this.max_size },
      fileFilter: (req, file, cb) => {
        this.sanitizeFile(file, cb);
      }
    });
  };
  public handleSingleFileUploadMulterErrors = (upload: multer.Multer, field: string) => {
    return (req: Request, res: Response, next: NextFunction) => {
      upload.single(field)(req, res, (err: any) => {
        if (err instanceof multer.MulterError) {
          return res.status(400).json({ error: `Multer error: ${err.message}` });
        } else if (err) {
          return res.status(500).json({ error: `Unknown error: ${err.message}` });
        }
        next();
      });
    };
  };
  public handleMultipleFilesUploadMulterErrors = (upload: multer.Multer, field: string, maxCount: number = 1) => {
    return (req: Request, res: Response, next: NextFunction) => {
      upload.array(field, maxCount)(req, res, (err: any) => {
        if (err instanceof multer.MulterError) {
          return res.status(400).json({ error: `Multer error: ${err.message}` });
        } else if (err) {
          return res.status(500).json({ error: `Unknown error: ${err.message}` });
        }
        next();
      });
    };
  };
  public handleFieldsUploadMulterErrors = (upload: multer.Multer, fields: { name: string; maxCount: number }[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
      upload.fields(fields)(req, res, (err: any) => {
        if (err instanceof multer.MulterError) {
          return res.status(400).json({ error: `Multer error: ${err.message}` });
        } else if (err) {
          return res.status(500).json({ error: `Unknown error: ${err.message}` });
        }
        next();
      });
    };
  };
  public handleAnyUploadMulterErrors = (upload: multer.Multer) => {
    return (req: Request, res: Response, next: NextFunction) => {
      upload.any()(req, res, (err: any) => {
        if (err instanceof multer.MulterError) {
          return res.status(400).json({ error: `Multer error: ${err.message}` });
        } else if (err) {
          return res.status(500).json({ error: `Unknown error: ${err.message}` });
        }
        next();
      });
    };
  };
}
