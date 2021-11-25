import React, { useCallback } from 'react';
import { Control, FieldValue, useController } from 'react-hook-form';
import NumberFormat, { NumberFormatProps } from 'react-number-format';

import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from '@chakra-ui/react';

const NumInput = ({
  label,
  control,
  name,
  hidden,
  ...props
}: {
  label: string;
  name: string;
  control?: Control<FieldValue<any>>;
} & NumberFormatProps) => {
  const { field, fieldState } = useController({
    control,
    name,
  });
  const { onChange } = field;
  const handleChange = useCallback(
    ({ floatValue }: any) => onChange(floatValue),
    [onChange]
  );
  return (
    <FormControl isInvalid={fieldState.invalid}>
      <FormLabel hidden={hidden}>{label}</FormLabel>
      <NumberFormat
        customInput={Input}
        getInputRef={field.ref}
        onValueChange={handleChange}
        value={field.value}
        name={field.name}
        hidden={hidden}
        {...props}
      />
      <FormErrorMessage>{fieldState.error?.message}</FormErrorMessage>
    </FormControl>
  );
};

export default NumInput;
