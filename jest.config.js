module.exports = {
  testEnvironment: "jsdom", 
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  moduleNameMapper: {
    "\\.(css|scss)$": "identity-obj-proxy", 
    "^@/(.*)$": "<rootDir>/src/$1" 
  },
  transform: {
    "^.+\\.(ts|tsx|js|jsx)$": "babel-jest"
  },
  extensionsToTreatAsEsm: [".ts", ".tsx"]
};
