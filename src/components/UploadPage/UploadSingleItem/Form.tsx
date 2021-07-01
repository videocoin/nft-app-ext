import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import * as S from './styles';
import View from 'components/UI/View';
import Switch from 'components/UI/Switch';
import Button from 'components/UI/Button';
import { observer } from 'mobx-react-lite';
import { useStore } from './store';
import { ErrorMessage } from '@hookform/error-message';
import StatusModal from 'components/UploadPage/UploadSingleItem/StatusModal';
import FadeModal from 'components/UI/FadeModal';

const Form = () => {
  const { asset } = useStore();
  const [isOpen, setOpen] = useState(false);
  const {
    register,
    getValues,
    handleSubmit,
    watch,
    formState: { errors },
  } = useFormContext();

  const onSubmit = async () => {
    if (!asset) return;
    setOpen(true);
  };

  // const watchedInstant = watch('instant');
  const watchedInstant = true;
  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <S.Section>
        <S.Label>Name</S.Label>
        <S.Input
          hasError={errors.name}
          {...register('name')}
          placeholder="e.g. Name me please ..."
        />
        <S.Error>
          <ErrorMessage errors={errors} name="name" />
        </S.Error>
      </S.Section>
      <S.Section>
        <S.Label>Youtube Link</S.Label>
        <S.Input placeholder="e.g. youtube.com/watch?v=aaBBc_D_eFG" />
      </S.Section>
      <S.Section>
        <S.Label>Description</S.Label>
        <S.Textarea
          rows={6}
          {...register('desc')}
          placeholder="Provide a detailed description please ..."
        />
      </S.Section>
      <S.Section>
        <View row>
          <View marginR={40}>
            <S.Label>Royalties</S.Label>
            <S.Input
              {...register('royalty', { valueAsNumber: true })}
              placeholder="e.g. 10%"
            />
          </View>
          <div>
            <S.Label>Size</S.Label>
            <S.Input placeholder="e.g. 5 gigabytes" />
          </div>
        </View>
      </S.Section>
      <S.BidSettings>
        <View row centerV spread marginB={50}>
          <div>
            <S.Label>Put on sale</S.Label>
            <div>You’ll receive bids on this item.</div>
          </div>
          <div>
            <Switch register={register} name="onSale" />
          </div>
        </View>
        <View row centerV spread>
          <div>
            <S.Label>Instant sale price</S.Label>
            <div>
              Enter the price for which the item will be <br />
              instantly sold.
            </div>
          </div>
          <div>
            <Switch register={register} disabled name="instant" />
          </div>
        </View>
        {watchedInstant && (
          <>
            <View marginT={50}>
              <S.Label>Price</S.Label>
              <S.Input
                hasError={errors.name}
                {...register('instantSalePrice')}
                placeholder="e.g. 10"
              />
            </View>
            <S.Fee>
              Fee Notice: This marketplace charges 2.5% (0.023 VID) fee to
              create an NFT
            </S.Fee>
          </>
        )}
      </S.BidSettings>
      <Button type="submit" size="lg">
        Create Video Item
      </Button>
      <FadeModal isOpen={isOpen}>
        <StatusModal
          onClose={() => setOpen(false)}
          getValues={getValues}
          assetId={asset?.id}
        />
      </FadeModal>
    </form>
  );
};

export default observer(Form);
