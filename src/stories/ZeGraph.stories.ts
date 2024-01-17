import type { Meta, StoryObj } from "@storybook/react"

import { ZeGraph } from "../components/ZeGraph"

const meta = {
  title: "ZeGraph",
  component: ZeGraph,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof ZeGraph>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    width: "1000px",
    height: "1000px",
  },
}
