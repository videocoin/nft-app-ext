import React from 'react';
import { ReactComponent as AudioIcon } from 'icons/music.svg';
import Avatar from 'components/Avatar';
import defaultBg from 'img/developersNFT.png';
import View from 'components/UI/View';
import { Asset } from 'types/asset';
import { Media } from 'types/media';

import * as S from './styles';

import { Center, Heading } from '@chakra-ui/react';

const AssetPreview = ({ asset, media }: { asset: Asset; media?: Media }) => {
  const { owner, name } = asset;

  const renderPreview = () => {
    if (!media)
      return <img width={134} height={76} src={defaultBg} alt={name} />;

    switch (media.mediaType) {
      case 'audio':
        return (
          <Center boxSize="134px" bg="#ED6858">
            <AudioIcon width={52} height={52} />
          </Center>
        );
      case 'image':
      case 'video':
        return (
          <img width={134} height={76} src={media.thumbnailUrl} alt={name} />
        );
      default:
        return (
          <Center
            borderRadius={20}
            objectFit="cover"
            boxSize="76px"
            bg="#7549D4"
          >
            <Heading color="white" fontSize="xl">
              FILE
            </Heading>
          </Center>
        );
    }
  };

  return (
    <>
      <S.Title>Place a bid</S.Title>
      <S.AssetPreview>
        <View row centerV>
          {renderPreview()}
          <View marginL={20}>
            <View row centerV marginB={16}>
              <Avatar name={owner.user.name} size="xxs" />
              <View marginL={10}>
                <S.Username>{`@${owner.user.username}`}</S.Username>
              </View>
            </View>
            <S.AssetName>{name}</S.AssetName>
          </View>
        </View>
      </S.AssetPreview>
    </>
  );
};

export default AssetPreview;
