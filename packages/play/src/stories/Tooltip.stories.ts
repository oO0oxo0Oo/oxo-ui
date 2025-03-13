import type { StoryObj, Meta } from "@storybook/vue3";

import { fn } from "@storybook/test";
import { OxTooltip } from "oxo-ui";
import 'oxo-ui/dist/theme/Tooltip.css'

type Story = StoryObj<typeof OxTooltip>;

const meta: Meta<typeof OxTooltip> = {
  title: "Example/Tooltip",
  component: OxTooltip,
  tags: ["autodocs"],
  argTypes: {
    trigger: {
      options: ["hover", "click", "contextmenu"],
      control: {
        type: "select",
      },
    },
    placement: {
      options: ["top", "bottom", "left", "right"],
      control: {
        type: "select",
      },
    },
  },
  args: {
    "onVisible-change": fn(),
  },
};

export const Default: Story = {
  args: {
    content: "This is a tooltip",
    placement: "top",
    trigger: "hover",
  },
  render: (args) => ({
    components: { OxTooltip },
    setup() {
      return {
        args,
      };
    },
    template: `
      <OxTooltip v-bind="args">
          <div style="height:30px;width:200px;background:red;padding:auto">trigger</div>
      </OxTooltip>
    `,
  }),
};

export default meta;
