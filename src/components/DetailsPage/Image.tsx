import axios from 'axios';
import LockInfo from 'components/DetailsPage/LockInfo';
import CryptoJS from 'crypto-js';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Media } from 'types/media';

import { Box, Image as BaseImage } from '@chakra-ui/react';

const Image = ({
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
  const { url, contentType, featured, name, thumbnailUrl } = media;
  const [unlocked, setUnlocked] = useState(
    (!locked && !shouldDecrypt) || featured
  );
  const imageRef = useRef<HTMLImageElement>(null);
  const decodeImage = useCallback(async () => {
    if (!imageRef.current || !decoder) return;
    const { key, first_iv } = JSON.parse(decoder);
    const { data: mediaData } = await axios(url);
    const _key = CryptoJS.enc.Hex.parse(key);
    const iv = CryptoJS.enc.Hex.parse(first_iv);
    const data = CryptoJS.AES.decrypt(mediaData, _key, {
      iv,
    }).toString(CryptoJS.enc.Base64);
    imageRef.current.src = `data:${contentType};base64,${data}`;
    setUnlocked(true);
  }, [contentType, decoder, url]);

  useEffect(() => {
    if (!featured && shouldDecrypt) {
      decodeImage();
    }
  }, [decodeImage, featured, shouldDecrypt]);

  return (
    <Box>
      <BaseImage src={thumbnailUrl} alt={name} ref={imageRef} />
      {!unlocked && <LockInfo />}
    </Box>
  );
};

export default Image;
