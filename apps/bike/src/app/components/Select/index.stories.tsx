import { Story, Meta } from '@storybook/react';
import Select, { Props } from './index';

export default {
  component: Select,
  title: 'Select'
} as Meta;

const Template: Story<Props<number>> = (args) => <Select {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  options: [
    { text: '台北市', value: 1 },
    { text: '新北市', value: 2 },
    { text: '新北台北北北北', value: 3 }
  ]
};
