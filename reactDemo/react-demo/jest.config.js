module.exports = {
    transform: {
        "^.+\\.(js|jsx)$": "babel-jest",
        "^.+\\.(png|jpg|ttf|woff|woff2)$": "jest-transform-stub",
    },
    testEnvironment: 'jsdom'
};
