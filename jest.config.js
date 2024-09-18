// jest.config.js
export default {
  transform: {
    '^.+\\.jsx?$': 'babel-jest', // 使用 Babel 处理 .js 和 .jsx 文件
  },
  // 如果使用 Babel，可以移除 extensionsToTreatAsEsm
  // extensionsToTreatAsEsm: ['.ts']
};
