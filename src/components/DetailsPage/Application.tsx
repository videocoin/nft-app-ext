import axios from 'axios';
import CryptoJS from 'crypto-js';
import downloadFile from 'helpers/downloadFile';
import { ReactComponent as FileIcon } from 'icons/file.svg';
import { ReactComponent as UnlockIcon } from 'icons/unlock.svg';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Media } from 'types/media';

import { Box, Heading, HStack, Square, Text, VStack } from '@chakra-ui/react';

const Application = ({
  media,
  decoder,
  shouldDecrypt,
  locked,
}: {
  media: Media;
  decoder: any;
  locked: boolean;
  shouldDecrypt: boolean;
}) => {
  const { url, contentType, featured, name } = media;
  const downloadLink = useRef<string>(url);
  const [unlocked, setUnlocked] = useState(
    (!locked && !shouldDecrypt) || featured
  );
  const decode = useCallback(async () => {
    if (!decoder) return;
    const { key, first_iv } = JSON.parse(decoder);
    const { data: mediaData } = await axios(url);
    const _key = CryptoJS.enc.Hex.parse(key);
    const iv = CryptoJS.enc.Hex.parse(first_iv);
    const data = CryptoJS.AES.decrypt(mediaData, _key, {
      iv,
    }).toString(CryptoJS.enc.Base64);
    downloadLink.current = `data:${contentType};base64,${data}`;
    setUnlocked(true);
  }, [contentType, decoder, url]);

  const onDownload = () => {
    downloadFile(downloadLink.current, name);
  };

  useEffect(() => {
    if (!featured && shouldDecrypt) {
      decode();
    }
  }, [decode, featured, shouldDecrypt]);

  return (
    <>
      <VStack
        spacing={4}
        align="start"
        boxShadow="md"
        borderRadius="2xl"
        bg="white"
        p={12}
      >
        {unlocked ? (
          <HStack spacing={4}>
            <HStack
              px={5}
              py={media.featured ? 3 : 2}
              border="1px solid #EDF0F4"
              borderRadius="lg"
            >
              {!media.featured && <UnlockIcon />}
              <Text fontWeight="bold" textTransform="uppercase" fontSize="xs">
                {!media.featured ? 'Unlocked' : 'Preview'}
              </Text>
            </HStack>
            <Box
              as="button"
              type="button"
              bg="purple.500"
              px={5}
              py={3}
              borderRadius="lg"
              onClick={onDownload}
            >
              <Text
                fontWeight="bold"
                color="white"
                textTransform="uppercase"
                fontSize="xs"
              >
                Download
              </Text>
            </Box>
          </HStack>
        ) : (
          <Box bg="purple.500" px={5} py={3} borderRadius="lg">
            <Text
              fontWeight="bold"
              color="white"
              textTransform="uppercase"
              fontSize="xs"
            >
              Purchase to Unlock
            </Text>
          </Box>
        )}
        <HStack align="center" spacing={6}>
          <Square size="80px" borderRadius="3xl" bg="#ed6858">
            <FileIcon />
          </Square>
          <Heading>{media.name}</Heading>
        </HStack>
      </VStack>
    </>
  );
};

export default Application;
