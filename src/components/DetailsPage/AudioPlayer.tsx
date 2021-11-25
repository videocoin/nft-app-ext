import base64url from 'base64url';
import LockInfo from 'components/DetailsPage/LockInfo';
import { MediaPlayer } from 'dashjs';
import audioBg from 'img/audio_bg_xl.jpg';
import React, {
  CSSProperties,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Media } from 'types/media';

import { AbsoluteCenter, Box, Image } from '@chakra-ui/react';

const AudioPlayer = ({
  media,
  decoder,
  shouldDecrypt,
  locked,
}: {
  media: Media;
  decoder: any;
  shouldDecrypt: boolean;
  locked: boolean;
}) => {
  const { url, featured } = media;
  const [unlocked, setUnlocked] = useState(
    (!locked && !shouldDecrypt) || featured
  );
  const player = MediaPlayer().create();
  const audioRef = useRef<any>(null);
  const decrypt = useCallback(async () => {
    if (!audioRef.current || !decoder) return;
    const { kid, key } = JSON.parse(decoder);
    player.initialize(audioRef.current, url);
    const protectionData = { 'org.w3.clearkey': { clearkeys: Object() } };
    protectionData['org.w3.clearkey'].clearkeys[base64url(kid, 'hex')] =
      base64url(key, 'hex');
    player.setProtectionData(protectionData);
    setUnlocked(true);
  }, [decoder, player, url]);

  useEffect(() => {
    if (!featured && shouldDecrypt) {
      decrypt();
    }
  }, [decrypt, featured, shouldDecrypt]);

  const playerStyle: CSSProperties = useMemo(
    () => ({
      position: unlocked ? 'static' : 'absolute',
      opacity: unlocked ? 1 : 0,
    }),
    [unlocked]
  );

  return (
    <Box height="430px">
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
        src={url}
        ref={audioRef}
        controls
        loop
        muted
        playsInline
        style={playerStyle}
      />
      {!unlocked && <Image filter="auto" blur="4px" src={audioBg} />}
      {!unlocked && <LockInfo />}
    </Box>
  );
};

export default AudioPlayer;
