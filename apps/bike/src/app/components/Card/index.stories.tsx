import { Story, Meta } from '@storybook/react';
import Card, { Prop } from './index';

export default {
  component: Card,
  title: 'Card'
} as Meta;

const Template: Story<Prop> = (args) => <Card {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  children: <div>Content</div>
};
