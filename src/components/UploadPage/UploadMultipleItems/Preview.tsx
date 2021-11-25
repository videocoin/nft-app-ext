import downloadFile from 'helpers/downloadFile';
import { ReactComponent as FileUploadIcon } from 'icons/fileUpload.svg';
import audioBg from 'img/audio_bg_xl.jpg';
import React from 'react';
import { useWatch } from 'react-hook-form';
import SwiperCore, { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Media } from 'types/media';

import {
  AbsoluteCenter,
  Badge,
  Box,
  Center,
  Heading,
  Image,
  Spinner,
  Text,
} from '@chakra-ui/react';

import { SwiperWrapper } from './styles';
SwiperCore.use([Navigation]);

const Preview = () => {
  const name = useWatch({
    name: 'name',
    defaultValue: 'Name me please...',
  });
  const items = useWatch({ name: 'previewItems' });
  const renderSlide = (item: Media, idx: number) => {
    const render = () => {
      if (item.status !== 'READY') {
        return (
          <Center boxSize="100%">
            <Spinner size="xl" speed="1s" color="purple.500" />
          </Center>
        );
      }
      switch (item.mediaType) {
        case 'video':
          return (
            <Box
              width="100%"
              height="100%"
              objectFit="contain"
              background="black"
              as="video"
              src={item.url}
              controls
              muted
              playsInline
              borderRadius="2xl"
            />
          );
        case 'image':
          return (
            <Center
              boxSize="100%"
              borderRadius="2xl"
              background="black"
              overflow="hidden"
            >
              <Image
                src={item.url}
                objectFit="contain"
                objectPosition="center"
                h="100%"
                w="100%"
              />
            </Center>
          );
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
                src={item.url}
              />
            </Box>
          );
        default: {
          const onClick = () => downloadFile(item.url, item.name);
          return (
            <Box
              as="button"
              type="button"
              onClick={onClick}
              px={5}
              py={3}
              border="1px solid #EDF0F4"
              borderRadius="lg"
            >
              <Text fontWeight="bold" textTransform="uppercase">
                Download preview
              </Text>
            </Box>
          );
        }
      }
    };
    return <SwiperSlide key={item.itemId || idx}>{render()}</SwiperSlide>;
  };
  return (
    <Box
      pos="sticky"
      top={12}
      bg="white"
      borderWidth="1px"
      borderColor="gray.100"
      borderRadius="4xl"
      shadow="lg"
      width="100%"
      maxW={540}
    >
      <Box p={10}>
        <Badge size="xl" variant="solid" colorScheme="purple">
          Preview
        </Badge>
      </Box>
      {!items?.length ? (
        <Center
          flexDir="column"
          m={10}
          mt={0}
          h={300}
          bg="gray.100"
          borderRadius="2xl"
        >
          <FileUploadIcon width={24} height={24} />
          <Heading color="gray.400" size="sm" mt={1}>
            Your Files
          </Heading>
        </Center>
      ) : (
        <Box width="100%" mb={10} h={300}>
          <SwiperWrapper>
            <Swiper
              allowTouchMove={false}
              draggable={false}
              simulateTouch={false}
              navigation
              spaceBetween={40}
            >
              {items.map(renderSlide)}
            </Swiper>
          </SwiperWrapper>
        </Box>
      )}
      <Box px={10} mb={10}>
        <Heading size="lg">{name || 'Name me please...'}</Heading>
      </Box>
    </Box>
  );
};

export default Preview;
