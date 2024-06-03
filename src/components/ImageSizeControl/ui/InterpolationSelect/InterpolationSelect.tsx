'use client';

import { Select, Tooltip } from 'antd';
import Text from 'antd/es/typography/Text';
import { FC } from 'react';

import classes from './InterpolationSelect.module.css';

const { Option } = Select;

const options = [
  {
    title: 'Nearest neighbour',
    description:
      "Each pixel's color is assigned to the value of the closest pixel of the original image",
  },
];

const selectDefaultValue = options[0];

export const SelectInterpolation: FC = () => {
  return (
    <div className={classes.container}>
      <Text>Select interpolation method</Text>
      <Select defaultValue={selectDefaultValue}>
        {options.map((option) => (
          <Option key={option.title} value={option.title}>
            <Tooltip title={option.description}>
              <Text>{option.title}</Text>
            </Tooltip>
          </Option>
        ))}
      </Select>
    </div>
  );
};
