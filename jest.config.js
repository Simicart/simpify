module.exports = async () => {
    return {
        verbose: true,
        modulePathIgnorePatterns: [
            '/node_modules/',
            '<rootDir>/.github/',
            '<rootDir>/cypress/',
            '<rootDir>/public/',
        ],
        coverageDirectory: '<rootDir>/report',
    };
};
