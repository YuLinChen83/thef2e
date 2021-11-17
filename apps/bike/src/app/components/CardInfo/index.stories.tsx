import { Story, Meta } from '@storybook/react';
import CardInfo, { Prop } from './index';

export default {
  component: CardInfo,
  title: 'CardInfo'
} as Meta;

const Template: Story<Prop> = (args) => <CardInfo {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  type: 'station'
};
