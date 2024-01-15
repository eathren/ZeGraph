import type { Meta, StoryObj } from "@storybook/react"

import { VGraph } from "../components/VGraph"

const meta = {
  title: "Vgraph",
  component: VGraph,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof VGraph>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {},
}
