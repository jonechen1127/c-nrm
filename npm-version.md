# npm version

命令用于更新项目的版本号，并将其记录在 package.json 文件中。这个命令对于版本控制和发布流程非常有用。以下是 npm version 的使用说明：

## 基本用法

### 1. 显示当前版本

要查看当前的项目版本，可以运行以下命令：

```bash
npm version # 显示当前版本
```

### 2. 更新版本

npm version 允许你根据语义版本控制（SemVer）规则更新项目版本。你可以指定版本号或使用关键字来自动增加版本号：

#### 设置特定版本

```bash
npm version 1.2.3 # 将版本更新为 1.2.3
```

#### 增加版本号

* patch：增加补丁版本号（即版本号的最后一部分）。例如，从 1.2.3 更新为 1.2.4。

```bash
npm version patch
```

* minor：增加次版本号（即版本号的中间部分）。例如，从 1.2.3 更新为 1.3.0。

```bash
npm version minor
```

* major：增加主版本号（即版本号的第一部分）。例如，从 1.2.3 更新为 2.0.0。

```bash
npm version major
```

#### 预发布版本

如果你需要添加预发布标签，可以使用以下命令：

```bash
npm version premajor --preid beta
```

这将生成一个预发布版本，例如 2.0.0-beta.0。

### 3. 自动生成提交和标签

npm version 还可以自动生成 Git 提交和标签。如果你在项目中使用 Git，并且配置了 Git 钩子，那么运行 npm version 命令会自动创建一个 Git 提交和标签。

```bash
npm version patch
```

这将会创建一个 Git 提交，提交信息为 "v1.2.4"，并创建一个名为 "v1.2.4" 的标签。
