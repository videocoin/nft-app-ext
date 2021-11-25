import { Step } from 'components/Modals/PutOnSale/share';
import { useFormContext } from 'react-hook-form';

import {
  Box,
  Button,
  Center,
  Flex,
  ModalBody,
  ModalHeader,
  Text,
  VisuallyHiddenInput,
} from '@chakra-ui/react';
import styled from '@emotion/styled';

const CheckBox = styled(Box)`
  cursor: pointer;
  input:checked + div {
    background: #7549d4;
    &::after {
      content: '';
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: #fff;
    }
  }
`;

const ChooseType = ({ setStep }: { setStep: (step: Step) => void }) => {
  const { register, getValues } = useFormContext();
  const handleNext = () => {
    const { type } = getValues();
    setStep(type);
  };
  return (
    <div>
      <ModalHeader>Want to sell this item?</ModalHeader>
      <ModalBody>
        <Flex as="label" mb={10} justify="space-between">
          <Box>
            <Text fontWeight={700}>Instant sale price</Text>
            <Text maxW={300}>
              Enter the price for which the item will be instantly sold.
            </Text>
          </Box>
          <CheckBox>
            <VisuallyHiddenInput
              type="radio"
              value={Step.instantSale}
              {...register('type')}
            />
            <Center
              boxSize="60px"
              bg="#F8FAFC"
              border="1px solid #E4E8ED"
              borderRadius="xl"
            />
          </CheckBox>
        </Flex>
        <Flex as="label" justify="space-between" mb={12}>
          <Box>
            <Text fontWeight={700}>Put on sale</Text>
            <Text maxW={300}>
              This will become an auction and you’ll receive bids on this item.
            </Text>
          </Box>
          <CheckBox>
            <VisuallyHiddenInput
              type="radio"
              value={Step.putOnSale}
              {...register('type')}
            />
            <Center
              boxSize="60px"
              bg="#F8FAFC"
              border="1px solid #E4E8ED"
              borderRadius="xl"
            />
          </CheckBox>
        </Flex>
        <Button size="md" isFullWidth onClick={handleNext}>
          Continue
        </Button>
      </ModalBody>
    </div>
  );
};

export default ChooseType;
