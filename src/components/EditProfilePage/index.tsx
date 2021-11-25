import accountApi, { useProfile } from 'api/account';
import AvatarUpload from 'components/EditProfilePage/AvatarUpload';
import CoverUpload from 'components/EditProfilePage/CoverUpload';
import Button from 'components/UI/Button';
import Container from 'components/UI/Container';
import Spinner from 'components/UI/Spinner';
import View from 'components/UI/View';
import { pickBy } from 'lodash';
import React, { useEffect, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useQueryClient } from 'react-query';

import { useToast } from '@chakra-ui/react';

import * as S from './styles';

const EditProfilePage = () => {
  const toast = useToast();
  const { data, isFetchedAfterMount } = useProfile();
  const defaultValues = useMemo(
    () => ({
      name: data?.user.name,
      customUrl: data?.user.customUrl,
      bio: data?.user.bio,
      imageData: '',
      coverData: '',
      username: data?.user.username,
    }),
    [data]
  );

  const client = useQueryClient();
  const { register, reset, control, formState, handleSubmit } = useForm({
    defaultValues,
  });

  useEffect(() => {
    if (isFetchedAfterMount) {
      reset(defaultValues);
    }
  }, [defaultValues, isFetchedAfterMount, reset]);

  const onSubmit = async (values: any) => {
    try {
      await accountApi.updateAccount(pickBy(values));
      await client.invalidateQueries('profile');
      await client.invalidateQueries('creators');
    } catch (e: any) {
      toast({ title: e.response.data.message, status: 'error' });
    }
  };

  if (!data) return <Spinner />;

  return (
    <S.Wrapper>
      <Container>
        <S.Title>Edit profile</S.Title>
        <S.Description>
          You can set preferred display name,{' '}
          <strong>create your profile URL</strong> and manage other personal
          settings.
        </S.Description>
        <form onSubmit={handleSubmit(onSubmit)}>
          <View row>
            <Controller
              name="imageData"
              control={control}
              render={({ field }) => (
                <AvatarUpload
                  onChange={field.onChange}
                  defaultValue={data.profileImgUrl}
                  name={data.address}
                />
              )}
            />
            <View flex={1}>
              <Controller
                name="coverData"
                control={control}
                render={({ field }) => (
                  <CoverUpload onChange={field.onChange} />
                )}
              />
              <S.Input>
                <div>Display Name</div>
                <input
                  type="text"
                  placeholder="Enter your display name"
                  {...register('name')}
                />
              </S.Input>
              <S.PrefixedInput>
                <div>User Name</div>
                <S.Prefix>@</S.Prefix>
                <input
                  type="text"
                  placeholder="Enter your username"
                  {...register('username')}
                />
              </S.PrefixedInput>
              <S.Input>
                <div>Custom URL</div>
                <input
                  type="text"
                  placeholder="videocoin.net/your_custom_url"
                  {...register('customUrl')}
                />
              </S.Input>
              <S.Input>
                <div>Bio</div>
                <textarea
                  placeholder="About yourself in a few words..."
                  {...register('bio')}
                />
              </S.Input>
              <Button size="lg" type="submit" disabled={formState.isSubmitting}>
                {formState.isSubmitting ? <Spinner /> : 'Update Profile'}
              </Button>
            </View>
          </View>
        </form>
      </Container>
    </S.Wrapper>
  );
};

export default EditProfilePage;
