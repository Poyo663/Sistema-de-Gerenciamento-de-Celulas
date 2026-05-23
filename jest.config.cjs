module.exports = {
  transformIgnorePatterns: [
    // Ignore all node_modules EXCEPT the one causing the error
    "node_modules/(?!(@faker-js)/)"
  ],
};
