module.exports = {
  testEnvironment: "jsdom", // Usa jsdom como entorno de pruebas
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"], // Archivo de configuración adicional
  moduleNameMapper: {
    "\\.(css|scss)$": "identity-obj-proxy", // Mock para archivos de estilos
    "^@/(.*)$": "<rootDir>/src/$1" // Alias para imports
  },
  transform: {
    "^.+\\.(ts|tsx|js|jsx)$": "babel-jest" // Transforma archivos TS/JS
  },
  extensionsToTreatAsEsm: [".ts", ".tsx"]
};
