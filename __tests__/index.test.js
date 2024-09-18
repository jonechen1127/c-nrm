import { exec } from 'child_process';
import path from 'path';
import { readFile } from 'fs/promises';

const packageJsonPath = path.join(process.cwd(), 'package.json'); // 获取 package.json 文件的绝对路径

let name, version;

beforeAll(async () => {
  const data = await readFile(packageJsonPath, 'utf8');
  const packageJson = JSON.parse(data);
  ({ name, version } = packageJson);
});

test('c-nrm -v', done => {
  exec('node bin/index.js -v', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing command: ${error}`);
      done(error); // 测试失败时调用 done 传递 error
      return;
    }

    try {
      // 检查输出是否包含 name 和 version
      expect(stdout).toContain(`${name} ${version}`);
      done(); // 测试通过时调用 done 结束测试
    } catch (err) {
      done(err); // 如果断言失败，调用 done 传递错误
    }
  });
});

test('c-nrm add', done => {
  const key = 'local';
  const value = 'http://localhost:8080';

  exec(`node bin/index.js add ${key} ${value}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing command: ${error}`);
      done(error); // 测试失败时调用 done 传递 error
      return;
    }

    // 打印 stdout 内容，帮助调试
    // console.log('stdout:', stdout);

    try {
      // 检查 stdout 是否包含新增的键值对
      expect(stdout).toContain(`success add registry`); // 根据实际的 JSON 输出修改断言
      done(); // 测试通过时调用 done 结束测试
    } catch (err) {
      done(err); // 如果断言失败，调用 done 传递错误
    }
  });
});
