import type { Meta, StoryObj } from "@storybook/vue3";
import { OxCollapse, OxCollapseItem } from "oxo-ui";
import 'oxo-ui/dist/theme/Collapse.css'

type Story = StoryObj<typeof OxCollapse>;

const meta: Meta<typeof OxCollapse> = {
  title: "Example/Collapse",
  component: OxCollapse,
  subcomponents: { OxCollapseItem },
  tags: ["autodocs"],
};

export const Default: Story = {
  render: (args) => ({
    components: {
      OxCollapse,
      OxCollapseItem,
    },
    setup() {
      return {
        args,
      };
    },
    template: `
    <ox-collapse v-bind="args">
      <ox-collapse-item name="a" title="Title a">
        <div>this is content a</div>
      </ox-collapse-item>
      <ox-collapse-item name="b" title="title b">
        <div>this is content b</div>
      </ox-collapse-item>
      <ox-collapse-item name="c" title="title c  disable" disabled>
        <div>this is content c</div>
      </ox-collapse-item>
    </ox-collapse>
    `,
  }),
  args: {
    accordion: true,
    modelValue: ["a"],
  },
};

export default meta;
