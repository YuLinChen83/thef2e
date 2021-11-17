import { Story, Meta } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import Header from './index';

export default {
  component: Header,
  title: 'Header'
} as Meta;

const Template: Story = (args) => (
  <MemoryRouter>
    <Header {...args} />
  </MemoryRouter>
);

export const Primary = Template.bind({});
Primary.args = {};
