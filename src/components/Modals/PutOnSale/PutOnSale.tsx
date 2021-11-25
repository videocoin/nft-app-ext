import { COIN } from 'const';
import { observer } from 'mobx-react-lite';
import { FungibleToken } from 'opensea-js/lib/types';
import { useCallback, useState, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { useStore } from 'store';
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

const PutOnSale = observer(
  ({ asset, setStep }: { asset: Asset; setStep: (step: Step) => void }) => {
    const { paymentTokens } = useStore('metamaskStore');
    const { register, watch, setValue } = useFormContext();
    const { auction } = asset;
    const usedToken = paymentTokens.find(
      (value) => value.address == auction.paymentTokenAddress
    );

    const watchedPutOnSalePrice = watch('putOnSalePrice');
    const watchedTokenAddress = watch('tokenAddress');
    const [symbol, setSymbol] = useState('');

    const handleNext = () => setStep(Step.finish);
    const renderOption = useCallback(
      ({ address, symbol }: FungibleToken) => (
        <option key={address} value={address}>
          {symbol} {address}
        </option>
      ),
      []
    );

    useEffect(() => {
      setValue('tokenAddress', watchedTokenAddress);
      setSymbol(
        (paymentTokens &&
          paymentTokens.find((value) => value.address == watchedTokenAddress)
            ?.symbol) ||
          ''
      );
    }, [setValue, watchedTokenAddress, paymentTokens]);

    const usedSymbol = usedToken?.symbol || COIN;

    return (
      <>
        <ModalHeader>Put on sale</ModalHeader>
        <ModalBody>
          <Divider mb={5} />
          <Box
            mb={7}
            pt={5}
            background="#F8FAFC"
            border="2px solid #EDF0F4"
            borderRadius="3xl"
          >
            <Text textAlign="center">Latest bid was</Text>
            <Text textAlign="center" fontWeight={700} mb={5}>
              {auction.currentBid} {usedSymbol}
            </Text>
            <S.InputWrapper>
              <S.BidInput
                {...register('putOnSalePrice', { valueAsNumber: true })}
                placeholder="0"
                type="number"
              />
              {symbol && <S.VIDBadge>{symbol}</S.VIDBadge>}
            </S.InputWrapper>

            <S.BidSelect {...register('tokenAddress')}>
              <option value="">Select your ERC20 token...</option>
              {paymentTokens.map(renderOption)}
            </S.BidSelect>
          </Box>
          <Divider mb={5} />
          <Flex mb={2} justify="space-between">
            <Text color="gray.400">Service fee</Text>
            <Text>2.5%</Text>
          </Flex>
          <Flex mb={10} justify="space-between">
            <Text color="gray.400">Starting bid price</Text>
            <Text>
              {watchedPutOnSalePrice || 0} {symbol}
            </Text>
          </Flex>
          <Button
            size="md"
            isFullWidth
            onClick={handleNext}
            disabled={
              !symbol ||
              isNaN(watchedPutOnSalePrice) ||
              watchedPutOnSalePrice < 0
            }
          >
            Continue
          </Button>
        </ModalBody>
      </>
    );
  }
);

export default PutOnSale;
