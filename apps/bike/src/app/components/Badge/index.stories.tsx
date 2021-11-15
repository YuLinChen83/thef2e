import { Story, Meta } from '@storybook/react';
import Badge from './index';

export default {
  component: Badge,
  title: 'Badge'
} as Meta;

type Prop = {
  type: 'normal' | 'success' | 'danger' | 'warning';
  children: string;
};
const Template: Story<Prop> = (args) => <Badge {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  type: 'success',
  children: 'YouBike 2.0'
};
