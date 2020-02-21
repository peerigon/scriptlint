const path = jest.genMockFromModule("path");
path.resolve = (...p) => p.join("/");

module.exports = path;
