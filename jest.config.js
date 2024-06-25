module.exports = {
    preset: 'ts-jest',
    setupFilesAfterEnv: ['./setupTestFramework.js'],
    testEnvironment: 'node',
    globals: {
        'ts-jest': {
            tsconfig: 'tsconfig.spec.json'
        }
    }
};
