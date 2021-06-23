import React from 'react';
import * as S from './styles';
import Dropzone from './Dropzone';
import Preview from './Preview';
import Form from './Form';
import { useForm, FormProvider } from 'react-hook-form';
import UploadStore, { StoreContext } from './store';
import { observer } from 'mobx-react-lite';
import { yupResolver } from '@hookform/resolvers/yup';
import validationSchema from './validation';

const Inner = observer(() => {
  const methods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      onSale: false,
      instant: true,
    },
  });
  return (
    <FormProvider {...methods}>
      <S.Wrapper>
        <div>
          <S.Title>Create Video Collectible</S.Title>
          <S.Inner>
            <S.Left>
              <S.Section>
                <S.Label>Upload Video File</S.Label>
                <Dropzone />
              </S.Section>
              <Form />
            </S.Left>
            <Preview />
          </S.Inner>
        </div>
      </S.Wrapper>
    </FormProvider>
  );
});

const UploadSingleItem = () => {
  const store = new UploadStore();
  return (
    <StoreContext.Provider value={store}>
      <Inner />
    </StoreContext.Provider>
  );
};

export default observer(UploadSingleItem);
