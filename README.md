# npm cli 命令及搭建私服

## npm pack 命令

npm pack 是一个命令行工具，主要用于打包 Node.js 项目或模块为一个 tarball 文件（.tgz 文件）。这个 tarball 文件包含了项目的源代码和所有相关的文件，可以用于发布或离线安装。

```bash
npm pack
```

## jest 测试注意点

### 如何支持 esm

如果你希望在不修改 Node.js 配置的情况下使用 ES 模块功能，可以使用 Babel 转译代码。以下是如何配置 Babel：

* 安装 Babel 相关依赖：

```bash
npm install --save-dev @babel/core @babel/preset-env babel-jest
```

* 配置 Babel（.babelrc 或 babel.config.json）：

```bash
{
  "presets": ["@babel/preset-env"]
}

```

* 在 Jest 中使用 Babel：

更新 jest.config.js 来使用 Babel：

```bash
// jest.config.js
module.exports = {
  transform: {
    '^.+\\.js$': 'babel-jest', // 使用 Babel 转换 .js 文件
  },
};

```

## 搭建 npm 私服

### 安装依赖并启动

```bash
npm install -g verdaccio
verdaccio
```

### 切换镜像源

```bash
c-nrm use local（c-nrm会自建命令行工具）
# npm config set registry http://localhost:4873/
```

### 使用 npm adduser 添加用户

```bash
npm adduser 
```

### 发布

```bash
npm publish 
```
