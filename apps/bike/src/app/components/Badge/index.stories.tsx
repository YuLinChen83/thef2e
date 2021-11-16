import { Story, Meta } from '@storybook/react';
import Badge, { Props } from './index';

export default {
  component: Badge,
  title: 'Badge'
} as Meta;

const Template: Story<Props> = (args) => <Badge {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  type: 'success',
  children: 'YouBike 2.0'
};
