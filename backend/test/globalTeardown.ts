const stopTestContainer = async (): Promise<void> => {
  await global.__TESTCONTAINERS__.postgres.stop();
};

module.exports = stopTestContainer;
export default stopTestContainer;
