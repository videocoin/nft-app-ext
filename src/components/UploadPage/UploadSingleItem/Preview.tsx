import React from 'react';
import * as S from './styles';
import { ReactComponent as VideoIcon } from 'icons/yt_filled.svg';
import { useStore } from './store';
import { useFormContext, useWatch } from 'react-hook-form';
import { observer } from 'mobx-react-lite';

const Preview = () => {
  const { asset } = useStore();
  const { control } = useFormContext();
  const name = useWatch({
    name: 'name',
    control,
    defaultValue: 'Name me please...',
  });
  return (
    <S.Preview>
      <S.PreviewBadge>Preview</S.PreviewBadge>
      {asset && asset.previewUrl ? (
        <video autoPlay muted controls src={asset.previewUrl} />
      ) : (
        <S.PreviewDesc>
          {asset ? (
            <S.StatusSpinner />
          ) : (
            <>
              <VideoIcon />
              Your Video Item
            </>
          )}
        </S.PreviewDesc>
      )}
      <S.PreviewName>{name || 'Name me please...'}</S.PreviewName>
    </S.Preview>
  );
};

export default observer(Preview);
