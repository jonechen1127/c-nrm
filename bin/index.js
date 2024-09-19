#!/user/bin/env node
import chalk from 'chalk';
import { file2Obj, obj2File } from '../utils/index.js';
import { exec } from 'child_process';
import path from 'path';
import { readFile } from 'fs/promises';
// 读取并解析 JSON 文件
const packageJsonPath = path.join(process.cwd(), 'package.json'); // 获取 package.json 文件的绝对路径
const data = await readFile(packageJsonPath, 'utf8');
const packageJson = JSON.parse(data);
let { name, version } = packageJson;
export { name, version };
// console.log(chalk.blue('Hello world!'));
// 输出蓝色的 "Hello world!"

let argv = process.argv.slice(2);

const dataObj = file2Obj('../data.json');

if (argv.indexOf('-v') != -1) {
  console.log(`${name} ${version}`);
} else if (argv.indexOf('ls') !== -1) {
  exec('npm config get registry', (err, stdout, stderr) => {
    if (err) {
      console.log(`exec error:${err}`);
      return;
    }

    for (let key in dataObj) {
      if (stdout.indexOf(dataObj[key]) != -1) {
        console.log(chalk.greenBright(`* ${key}=>${dataObj[key]}`));
      } else {
        console.log(`  ${key}=>${dataObj[key]}`);
      }
    }
  });
} else if (argv.indexOf('add') !== -1) {
  let key = argv[1];
  let value = argv[2];
  dataObj[key] = value;
  obj2File(dataObj, '../data.json');
  console.log('success add registry');
} else if (argv.indexOf('del') !== -1) {
  let key = argv[1];
  delete dataObj[key];
  obj2File(dataObj, '../data.json');
  console.log('success deleted registry');
} else if (argv.indexOf('update') !== -1) {
  let key = argv[1];
  let value = argv[2];
  if (dataObj[key]) {
    dataObj[key] = value;
    obj2File(dataObj, '../data.json');
    console.log('success update registry');
  } else {
    console.log('key not exist');
  }
} else if (argv.indexOf('use') !== -1) {
  let key = argv[1];
  let res = dataObj[key];
  if (res) {
    exec(`npm config set registry ${res}`, err => {
      if (err) {
        console.log(err, `${key} is not in c-nrm list`);
      } else {
        console.log(`set registry success:${res}`);
      }
    });
  } else {
    console.log(chalk.red(`${key} is not in c-nrm list`));
  }
} else if (argv.indexOf('list') !== -1) {
  console.log(chalk.grey(JSON.stringify(dataObj, null, 2)));
} else if (argv.indexOf('help') !== -1 || argv.indexOf('-h') !== -1) {
  console.log(
    chalk.yellowBright(`c-nrm help:
  c-nrm add <key> <value>     添加key-value
  c-nrm del <key>             删除key-value
  c-nrm update <key> <value>  更新key-value
  c-nrm use <key>             使用key-value
  c-nrm list                  查看所有key-value
  c-nrm help                  查看帮助`)
  );
}
