import Message from "./methods";
import { withInstallFunction } from "@oxo-ui/utils";

export const OxMessage = withInstallFunction(Message, "$message");

export * from "./types";
