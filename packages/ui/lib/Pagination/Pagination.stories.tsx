import type { Meta, StoryObj } from '@storybook/react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import { Pagination, type PaginationProps } from './Pagination';

const test = (value: number) => {
  console.log('currentpage', value);
};

const meta = {
  title: 'Components/Pagination',
  component: Pagination,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Pagination>;

export default meta;

type Story = StoryObj<typeof meta>;

const defaultProps: PaginationProps = {
  total: 80,
  pageSize: 10,
  activePage: undefined,
  defaultActivePage: 1,
  onChange: test,
  disabled: false,
};

export const DefaultPagination: Story = {
  args: {
    ...defaultProps,
  },
};

export const ExamplePagination: Story = {
  args: {
    ...defaultProps,
  },
};
