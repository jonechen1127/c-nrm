#!/usr/bin/env node
import chalk from 'chalk';
import { file2Obj, obj2File } from '../utils/index.js';
import { exec } from 'child_process';
import path from 'path';
import { readFile } from 'fs/promises';
import { fileURLToPath } from 'url';

// 获取当前脚本的路径
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 获取项目根目录
const packageJsonPath = path.join(process.cwd(), 'package.json');
const dataFilePath = path.resolve(__dirname, '../data.json'); // 使用绝对路径

// 读取并解析 package.json 文件
async function getPackageInfo() {
  try {
    const data = await readFile(packageJsonPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(chalk.red(`Error reading package.json: ${error.message}`));
    process.exit(1); // 退出进程
  }
}

// 输出包名和版本号
async function printVersion() {
  const { name, version } = await getPackageInfo();
  console.log(`${name} ${version}`);
}

// 列出所有仓库
function listRegistries(dataObj) {
  exec('npm config get registry', (err, stdout) => {
    if (err) {
      console.error(chalk.red(`Error executing npm config: ${err.message}`));
      return;
    }

    for (let key in dataObj) {
      if (stdout.includes(dataObj[key])) {
        console.log(chalk.greenBright(`* ${key} => ${dataObj[key]}`));
      } else {
        console.log(`  ${key} => ${dataObj[key]}`);
      }
    }
  });
}

// 添加仓库
function addRegistry(key, value, dataObj) {
  dataObj[key] = value;
  obj2File(dataObj, dataFilePath);
  console.log(chalk.green('Success: Added registry'));
}

// 删除仓库
function deleteRegistry(key, dataObj) {
  if (dataObj[key]) {
    delete dataObj[key];
    obj2File(dataObj, dataFilePath);
    console.log(chalk.green('Success: Deleted registry'));
  } else {
    console.log(chalk.red('Error: Key does not exist'));
  }
}

// 更新仓库
function updateRegistry(key, value, dataObj) {
  if (dataObj[key]) {
    dataObj[key] = value;
    obj2File(dataObj, dataFilePath);
    console.log(chalk.green('Success: Updated registry'));
  } else {
    console.log(chalk.red('Error: Key does not exist'));
  }
}

// 使用指定的仓库
function useRegistry(key, dataObj) {
  const registry = dataObj[key];
  if (registry) {
    exec(`npm config set registry ${registry}`, (err) => {
      if (err) {
        console.log(chalk.red(`Error: ${key} is not in the c-nrm list`));
      } else {
        console.log(chalk.green(`Success: Set registry to ${registry}`));
      }
    });
  } else {
    console.log(chalk.red(`Error: ${key} is not in the c-nrm list`));
  }
}

// 打印帮助信息
function printHelp() {
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

// 主逻辑
async function main() {
  let argv = process.argv.slice(2);
  const dataObj = file2Obj(dataFilePath);

  if (argv.includes('-v')) {
    await printVersion();
  } else if (argv.includes('ls')) {
    listRegistries(dataObj);
  } else if (argv.includes('add')) {
    let key = argv[1];
    let value = argv[2];
    if (key && value) {
      addRegistry(key, value, dataObj);
    } else {
      console.log(chalk.red('Error: Invalid add command. Usage: c-nrm add <key> <value>'));
    }
  } else if (argv.includes('del')) {
    let key = argv[1];
    if (key) {
      deleteRegistry(key, dataObj);
    } else {
      console.log(chalk.red('Error: Invalid delete command. Usage: c-nrm del <key>'));
    }
  } else if (argv.includes('update')) {
    let key = argv[1];
    let value = argv[2];
    if (key && value) {
      updateRegistry(key, value, dataObj);
    } else {
      console.log(chalk.red('Error: Invalid update command. Usage: c-nrm update <key> <value>'));
    }
  } else if (argv.includes('use')) {
    let key = argv[1];
    if (key) {
      useRegistry(key, dataObj);
    } else {
      console.log(chalk.red('Error: Invalid use command. Usage: c-nrm use <key>'));
    }
  } else if (argv.includes('list')) {
    console.log(chalk.grey(JSON.stringify(dataObj, null, 2)));
  } else if (argv.includes('help') || argv.includes('-h')) {
    printHelp();
  } else {
    console.log('Invalid command. Type `c-nrm help` for a list of available commands.');
  }
}

main().catch((err) => {
  console.error(chalk.red(`Error: ${err.message}`));
  process.exit(1);
});
