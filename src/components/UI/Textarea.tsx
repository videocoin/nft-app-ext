import React, { forwardRef } from 'react';

import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Textarea as BaseTextarea,
  TextareaProps,
} from '@chakra-ui/react';

const Textarea = forwardRef<
  HTMLTextAreaElement,
  { label: string; error?: string } & TextareaProps
>(({ label, error, ...props }, ref) => {
  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <BaseTextarea {...props} ref={ref} />
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  );
});

export default Textarea;
