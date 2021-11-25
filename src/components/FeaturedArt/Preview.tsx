import audioBg from 'img/audio_bg_xl.jpg';
import defaultThumb from 'img/developersNFT.png';
import { Media } from 'types/media';

import { AbsoluteCenter, Badge, Box, Center, Image } from '@chakra-ui/react';

import * as S from './styles';

const Preview = ({
  media,
  assetThumb,
}: {
  media?: Media;
  assetThumb: string;
}) => {
  if (!media) return null;
  const renderPreview = () => {
    const { mediaType, url, thumbnailUrl } = media;
    const posterUrl =
      mediaType === 'application' ? defaultThumb : thumbnailUrl || assetThumb;

    switch (mediaType) {
      case 'audio':
        return (
          <Box boxSize="100%" borderRadius="2xl" overflow="hidden">
            <AbsoluteCenter
              borderRadius="2xl"
              as="img"
              src={audioBg}
              width="100%"
              height="100%"
              objectFit="cover"
            />
            <Box
              as="audio"
              w="100%"
              h="100%"
              pos="relative"
              zIndex={10}
              controls
              src={url}
            />
          </Box>
        );
      case 'video':
        return (
          <Box
            width="100%"
            height="100%"
            objectFit="contain"
            background="black"
            as="video"
            poster={posterUrl}
            src={url}
            controls
            muted
            playsInline
            borderRadius="2xl"
          />
        );
      case 'application':
        return (
          <Center
            boxSize="100%"
            borderRadius="2xl"
            background="black"
            overflow="hidden"
          >
            <Image
              src={posterUrl}
              objectFit="contain"
              objectPosition="center"
              h="100%"
              w="100%"
            />
          </Center>
        );
      default:
        return (
          <Center
            boxSize="100%"
            borderRadius="2xl"
            background="black"
            overflow="hidden"
          >
            <Image
              src={url}
              objectFit="contain"
              objectPosition="center"
              h="100%"
              w="100%"
            />
          </Center>
        );
    }
  };

  return (
    <S.Video>
      {renderPreview()}
      <Badge
        size="xl"
        variant="solid"
        colorScheme="purple"
        position="absolute"
        left={6}
        top={6}
      >
        Featured
      </Badge>
    </S.Video>
  );
};

export default Preview;
