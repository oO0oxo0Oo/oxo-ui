import { isString } from "lodash-es";

class OxUIError extends Error {
  constructor(msg: string) {
    super(msg);
    this.name = "OxUIError";
  }
}
function createOxUIError(scope: string, msg: string) {
  return new OxUIError(`[${scope}]:${msg}`);
}

export function throwError(scope: string, msg: string) {
  throw createOxUIError(scope, msg);
}

export function debugWarn(error: Error): void;
export function debugWarn(scope: string, msg: string): void;
export function debugWarn(scope: string | Error, msg?: string) {
  if (process.env.NODE_ENV !== "production") {
    const err = isString(scope) ? createOxUIError(scope, msg!) : scope;
    console.warn(err);
  }
}