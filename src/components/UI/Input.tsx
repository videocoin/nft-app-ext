import React, { forwardRef } from 'react';

import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input as BaseInput,
  InputProps,
} from '@chakra-ui/react';

const Input = forwardRef<
  HTMLInputElement,
  { label: string; error?: string } & InputProps
>(({ label, error, ...props }, ref) => {
  const isInvalid = Boolean(error);
  return (
    <FormControl isInvalid={isInvalid}>
      <FormLabel>{label}</FormLabel>
      <BaseInput {...props} ref={ref} />
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  );
});

export default Input;
