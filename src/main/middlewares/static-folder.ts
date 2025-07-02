import path from 'path';
import express from 'express';

const staticfolder = express.static(path.resolve(process.cwd(), 'uploads'));

export { staticfolder };
