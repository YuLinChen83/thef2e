import { Story, Meta } from '@storybook/react';
import StatusIcon, { Props } from './index';

export default {
  component: StatusIcon,
  title: 'StatusIcon'
} as Meta;

const Template: Story<Props> = (args) => <StatusIcon {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  active: true,
  disabled: false
};
