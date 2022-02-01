import * as dotenv from "dotenv";
import * as fs from "fs";
import * as path from "path";

export const getConfig = (
  key: string,
  defaultValue?: string
): string | never => {
  // If the env var is defined in .env but empty the result would be empty string
  const value = (process.env[key] || null) ?? defaultValue;

  if (value == null) {
    throw new Error(`Could not find config ${key}`);
  }

  return value;
};

export const getConfigNumber = (
  key: string,
  defaultValue?: number
): number | never => Number(getConfig(key, defaultValue?.toString()));

export const getNodeEnv = (): string => {
  const env = getConfig("NODE_ENV", "");
  return (env && env.toLowerCase()) || "";
};

const NODE_ENV = getNodeEnv();

export const isTestEnvironment = NODE_ENV === "test";

export const isDevEnvironment = NODE_ENV === "development";

export const isProdEnvironment = NODE_ENV === "production";

export const isLocalEnvironment = !isProdEnvironment;

const DOT_ENV_FILE = ".env";

const envPath = path.resolve(DOT_ENV_FILE);

const envFiles = [`${envPath}.${NODE_ENV}.local`, `${envPath}.${NODE_ENV}`]
  .concat(NODE_ENV !== "test" ? `${envPath}.local` : [])
  .concat(envPath)
  .filter((i) => !!i);

envFiles.forEach((p: string) => fs.existsSync(p) && dotenv.config({ path: p }));
