import type { Plugin } from "vue";
import { describe, it, expect } from "vitest";
import {
  OxAlert,
  OxButton,
  OxButtonGroup,
  OxCollapse,
  OxCollapseItem,
  OxIcon,
} from "..";
import { get, map } from "lodash-es";

const comps = [
  OxAlert,
  OxButton,
  OxButtonGroup,
  OxCollapse,
  OxCollapseItem,
  OxIcon,
] as Plugin[];

describe("components/index", () => {
  it.each(map(comps, (c) => [get(c, "name") ?? "", c]))(
    "%s should be exported",
    (_, component) => {
      expect(component).toBeDefined();
      expect(component.install).toBeDefined();
    }
  );
});
