import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { sign, verify } = require('jsonwebtoken');

import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import dotenv from 'dotenv';
dotenv.config({ path: resolve(__dirname, '../.env') });


export const createJSONToken = (userId) => {
    return sign({ userId }, process.env.SECRET, { expiresIn: '1h' })
}

export const verifyJSONTToken = (token) => {
    return verify(token, process.env.SECRET);
}