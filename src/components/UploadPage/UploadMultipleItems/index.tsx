import Input from 'components/UI/Input';
import NumInput from 'components/UI/NumInput';
import Select from 'components/UI/Select';
import Textarea from 'components/UI/Textarea';
import { COIN } from 'const';
import { observer } from 'mobx-react-lite';
import { FungibleToken } from 'opensea-js/lib/types';
import { useEffect, useState } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { useStore } from 'store';

import {
  Box,
  Button,
  Container,
  Divider,
  Flex,
  Heading,
  HStack,
  Modal,
  ModalOverlay,
  Spacer,
  Switch,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';

import ContentUpload from './ContentUpload';
import Preview from './Preview';
import PreviewUpload from './PreviewUpload';
import StatusModal from './StatusModal';
import validationSchema from './validation';

interface FormValues {
  contentItems: any[];
  instantSalePrice: string;
  putOnSalePrice: string;
  tokenAddress: string;
  name: string;
  description: string;
  royalties: string;
  size: string;
  locked: boolean;
  previewItems: any[];
  putOnSale: boolean;
  instantSale: boolean;
}

const UploadMultipleItems = observer(() => {
  const { paymentTokens } = useStore('metamaskStore');
  console.log(paymentTokens);
  const { isOpen, onToggle } = useDisclosure();
  const formMethods = useForm<FormValues>({
    resolver: yupResolver(validationSchema) as any,
    defaultValues: {
      locked: false,
      putOnSale: true,
      instantSale: false,
    },
  });
  const {
    register,
    formState,
    handleSubmit,
    control,
    setValue,
    getValues,
    watch,
  } = formMethods;
  const watchedPutOnSale = watch('putOnSale');
  const watchedInstantSale = watch('instantSale');
  const watchedTokenAddress = watch('tokenAddress');
  const [symbol, setSymbol] = useState('');
  const renderOption = (token: FungibleToken) => (
    <option key={token.address} value={token.address}>
      {token.symbol} {token.address}
    </option>
  );

  useEffect(() => {
    setValue('instantSale', !watchedPutOnSale);
  }, [setValue, watchedPutOnSale]);

  useEffect(() => {
    setValue('putOnSale', !watchedInstantSale);
  }, [setValue, watchedInstantSale]);

  useEffect(() => {
    setValue('tokenAddress', watchedTokenAddress);
    setSymbol(
      (paymentTokens &&
        paymentTokens.find((value) => value.address == watchedTokenAddress)
          ?.symbol) ||
        ''
    );
  }, [setValue, watchedTokenAddress, paymentTokens]);

  return (
    <FormProvider {...formMethods}>
      <Container maxW="container.xl">
        <Heading size="3xl" mb={12}>
          New Collectible
        </Heading>
        <Divider mb={12} />
        <form noValidate onSubmit={handleSubmit(onToggle)}>
          <Flex align="start" pb={12}>
            <VStack flex={1} maxW={740} mr={28} align="stretch" spacing={10}>
              <PreviewUpload />
              <ContentUpload />
              <Input
                {...register('name')}
                placeholder="e.g. Name me please ..."
                label="Name"
                error={formState.errors.name?.message}
              />
              <Textarea
                {...register('description')}
                label="Description"
                rows={4}
                placeholder="Provide a detailed description please ..."
              />
              <HStack spacing={12}>
                <NumInput
                  name="royalties"
                  label="Royalties"
                  allowNegative={false}
                  thousandSeparator
                  suffix="%"
                  placeholder="e.g. 10%"
                />
                <NumInput
                  name="size"
                  label="Size"
                  allowNegative={false}
                  thousandSeparator
                  placeholder="e.g. 10GB"
                />
              </HStack>
              <Divider />
              <Select
                {...register('tokenAddress')}
                error={formState.errors.tokenAddress?.message}
                label="Select token"
                placeholder="Select your ERC20 token..."
                isDisabled={watchedInstantSale}
              >
                {paymentTokens.map(renderOption)}
              </Select>
              <Flex>
                <Box>
                  <Heading size="md">Put on sale</Heading>
                  <Text size="md">You&apos;ll receive bids on this item.</Text>
                </Box>
                <Spacer />
                <Controller
                  control={control}
                  render={({ field }) => (
                    <Switch
                      isChecked={field.value}
                      onChange={field.onChange}
                      ref={field.ref}
                      size="lg"
                    />
                  )}
                  name="putOnSale"
                />
              </Flex>
              <NumInput
                thousandSeparator
                allowNegative={false}
                prefix={`${symbol} `}
                placeholder="e.g. 10"
                label="Minimum Bid"
                name="putOnSalePrice"
                hidden={watchedInstantSale}
              />
              <Flex>
                <Box>
                  <Heading size="md">Instant sale price</Heading>
                  <Text size="md">
                    Enter the price for which the item will be instantly sold.
                  </Text>
                </Box>
                <Spacer />
                <Controller
                  control={control}
                  render={({ field }) => (
                    <Switch
                      isChecked={field.value}
                      onChange={field.onChange}
                      ref={field.ref}
                      size="lg"
                    />
                  )}
                  name="instantSale"
                />
              </Flex>
              <NumInput
                thousandSeparator
                allowNegative={false}
                prefix={`${COIN} `}
                placeholder="e.g. 10"
                label="Price"
                name="instantSalePrice"
                hidden={watchedPutOnSale}
              />
              <Divider />
              <Box>
                <Button type="submit">Create Item</Button>
              </Box>
            </VStack>
            <Preview />
          </Flex>
        </form>
      </Container>
      <Modal
        closeOnEsc={false}
        closeOnOverlayClick={false}
        onClose={onToggle}
        isOpen={isOpen}
      >
        <ModalOverlay />
        <StatusModal onClose={onToggle} getValues={getValues} />
      </Modal>
    </FormProvider>
  );
});

export default UploadMultipleItems;
