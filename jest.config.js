export default {
  moduleFileExtensions: ["js", "json", "vue", "jsx"],
  transform: {
    "^.+\\.vue$": "@vue/vue3-jest",
    "^.+\\.js$": "babel-jest",
    "^.+\\.vue$": "vue-jest",
  },
  testMatch: ["**/*.spec.js"],
  testEnvironment: "node",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  transformIgnorePatterns: ["/node_modules/(?!(jest/bin/jest.js)/)"],
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.{js,vue}",
    "!src/main.js", // ajusta conforme necessário
    "!src/App.vue", // ajusta conforme necessário
    "!src/router/index.js", // ajusta conforme necessário
    "!src/**", // ajusta conforme necessário
  ],
  coverageReporters: ["html", "text-summary"],
};
