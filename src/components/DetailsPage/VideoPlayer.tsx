import base64url from 'base64url';
import LockInfo from 'components/DetailsPage/LockInfo';
import { MediaPlayer } from 'dashjs';
import React, {
  CSSProperties,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Media } from 'types/media';

import { Box, Image } from '@chakra-ui/react';

const VideoPlayer = ({
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
  const { url, featured, thumbnailUrl } = media;
  const [unlocked, setUnlocked] = useState(
    (!locked && !shouldDecrypt) || featured
  );
  const player = MediaPlayer().create();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const decrypt = useCallback(async () => {
    if (!videoRef.current || !decoder) return;
    const { kid, key } = JSON.parse(decoder);
    player.initialize(videoRef.current, url);
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
    <Box>
      <video
        poster={thumbnailUrl}
        src={url}
        ref={videoRef}
        controls
        loop
        muted
        playsInline
        style={playerStyle}
      />
      {!unlocked && <Image src={thumbnailUrl} />}
      {!unlocked && <LockInfo />}
    </Box>
  );
};

export default VideoPlayer;
