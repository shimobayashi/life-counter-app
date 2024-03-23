module.exports = {
    "globals": {
      "ts-jest": {
        "tsconfig": "./tsconfig.test.json"
      }
    },
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    moduleNameMapper: {
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy'
    },
};
