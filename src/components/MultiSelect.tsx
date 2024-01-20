import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';

interface Option {
  value: string;
  label: string;
}

const MultiSelect = ({
  name,
  options,
  control,
}: {
  name: string;
  options: Option[];
  control: any;
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => <Select isMulti {...field} options={options} />}
    />
  );
};

export default MultiSelect;
