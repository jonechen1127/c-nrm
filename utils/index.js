import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
// Use import.meta.url to get the directory name in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// console.log(__filename);  // 输出当前文件的绝对路径
// console.log(__dirname);   // 输出当前文件所在的目录路径
export const file2Obj = file => {
  const filePath = path.resolve(__dirname, file);
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
};
export const obj2File = (obj, file) => {
  const filePath = path.resolve(__dirname, file);
  fs.writeFileSync(filePath, JSON.stringify(obj, null, 2), 'utf-8');
};
