module.exports = {
    testEnvironment: "jsdom",
    testPathIgnorePatterns: ["/node_modules/", "/.next/"],
    transform: {
        // Use babel-jest to transpile tests with the next/babel preset
        // https://jestjs.io/docs/configuration#transform-objectstring-pathtotransformer--pathtotransformer-object
        "^.+\\.(js|jsx|ts|tsx)$": ["babel-jest", { presets: ["next/babel"] }],
    },
    transformIgnorePatterns: ["/node_modules/"],
    moduleNameMapper: {
        baseUrl: ".",
        paths: {
            "@/*": ["src/*"],
        },
    },
    setupFilesAfterEnv: ["<rootDir>/src/tests/setupTests.ts"],
};
