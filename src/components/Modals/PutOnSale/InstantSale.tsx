import { COIN } from 'const';
import { useFormContext } from 'react-hook-form';
import { Asset } from 'types/asset';

import {
  Box,
  Button,
  Divider,
  Flex,
  ModalBody,
  ModalHeader,
  Text,
} from '@chakra-ui/react';

import { Step } from './share';
import * as S from './styles';

const InstantSale = ({
  asset,
  setStep,
}: {
  asset: Asset;
  setStep: (step: Step) => void;
}) => {
  const handleNext = () => setStep(Step.finish);
  const { register, watch } = useFormContext();
  const { instantSalePrice, token } = asset;
  const symbol = token?.symbol || COIN;
  const watchedInstantSalePrice = watch('instantSalePrice');

  return (
    <>
      <ModalHeader>Instant sale</ModalHeader>
      <ModalBody>
        <Divider mb={5} />
        <Box
          mb={7}
          pt={5}
          background="#F8FAFC"
          border="2px solid #EDF0F4"
          borderRadius="3xl"
        >
          <Text textAlign="center">You purchased this item for</Text>
          <Text textAlign="center" fontWeight={700} mb={5}>
            {instantSalePrice} {symbol}
          </Text>
          <S.InputWrapper>
            <S.BidInput
              placeholder="0"
              type="number"
              {...register('instantSalePrice', { valueAsNumber: true })}
            />
            <S.VIDBadge>{COIN}</S.VIDBadge>
          </S.InputWrapper>
        </Box>
        <Divider mb={5} />
        <Flex mb={10} justify="space-between">
          <Text color="gray.400">Service fee</Text>
          <Text>2.5%</Text>
        </Flex>
        <Button
          size="md"
          isFullWidth
          onClick={handleNext}
          disabled={
            isNaN(watchedInstantSalePrice) || watchedInstantSalePrice <= 0
          }
        >
          Continue
        </Button>
      </ModalBody>
    </>
  );
};

export default InstantSale;
