import Application from 'components/DetailsPage/Application';
import AudioPlayer from 'components/DetailsPage/AudioPlayer';
import Image from 'components/DetailsPage/Image';
import useDecoder from 'components/DetailsPage/useDecoder';
import VideoPlayer from 'components/DetailsPage/VideoPlayer';
import { ReactComponent as ArrowLeft } from 'icons/arrowLeft.svg';
import { ReactComponent as ArrowRight } from 'icons/arrowRight.svg';
import { sortBy } from 'lodash/fp';
import { useCallback, useEffect, useState } from 'react';
import SwiperCore, { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Media } from 'types/media';

import { Wrapper } from './styles';

SwiperCore.use([Navigation]);

const component = {
  video: VideoPlayer,
  image: Image,
  audio: AudioPlayer,
  application: Application,
};

const ContentReader = ({
  media,
  drmKey,
  shouldDecrypt,
  locked,
}: {
  media: Media[];
  drmKey: string;
  shouldDecrypt: boolean;
  locked: boolean;
}) => {
  const getDecoder = useDecoder(drmKey);
  const [decoder, setDecoder] = useState<any>();

  const genDecoder = useCallback(async () => {
    console.log(shouldDecrypt, decoder, getDecoder);
    if (shouldDecrypt && !decoder) {
      const decoder = await getDecoder();
      setDecoder(decoder);
    }
  }, [getDecoder, decoder, shouldDecrypt]);

  useEffect(() => {
    genDecoder();
  }, [genDecoder]);

  const sortedMedia = sortBy({ featured: false }, media);

  const renderSlide = (media: Media) => {
    const Comp = component[media.mediaType];
    return (
      <SwiperSlide key={media.id}>
        <Comp
          media={media}
          decoder={decoder}
          locked={locked}
          shouldDecrypt={shouldDecrypt}
        />
      </SwiperSlide>
    );
  };

  return (
    <Wrapper>
      <div>
        <button className="prev-btn" type="button">
          <span>
            <ArrowLeft />
          </span>
        </button>
        <button className="next-btn" type="button">
          <span>
            <ArrowRight />
          </span>
        </button>
        <Swiper
          loop
          simulateTouch={false}
          draggable={false}
          slidesPerView={1}
          spaceBetween={250}
          navigation={{
            prevEl: '.prev-btn',
            nextEl: '.next-btn',
          }}
        >
          {sortedMedia.map(renderSlide)}
        </Swiper>
      </div>
    </Wrapper>
  );
};

export default ContentReader;
