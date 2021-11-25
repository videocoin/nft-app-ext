import { forwardRef, ReactNode } from 'react';

import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Select as BaseSelect,
  SelectProps,
} from '@chakra-ui/react';

const Select = forwardRef<
  HTMLSelectElement,
  { label: string; error?: string; children: ReactNode } & SelectProps
>(({ children, label, error, ...props }, ref) => {
  const isInvalid = Boolean(error);
  return (
    <FormControl isInvalid={isInvalid}>
      <FormLabel>{label}</FormLabel>
      <BaseSelect {...props} ref={ref}>
        {children}
      </BaseSelect>
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  );
});

export default Select;
