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
        "^.+\\.module\\.(css|sass|scss)$": "identity-obj-proxy",
        "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
            "<rootDir>/__mocks__/fileMock.js",
    },
    setupFilesAfterEnv: ["<rootDir>/src/tests/setupTests.ts"],
};
