import initApp from "./core/app";
import { getConfig, getConfigNumber, isDevEnvironment } from "./core/config";
import "./core/errorHandler";

const port = getConfigNumber("PORT", 4000);

initApp()
  .then((app) => {
    if (isDevEnvironment) {
      console.log(app.printRoutes());
    }
    app.swagger();
    app.listen(port, getConfig("HOST", "127.0.0.1"), () =>
      console.log(`Example API listening on port ${port}`)
    );
  })
  .catch((err: Error) => {
    console.log({ err }, "Example API failed to start");
  });
