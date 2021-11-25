import { Creator } from 'types/creators';

import { Box, Flex, Heading } from '@chakra-ui/react';

import Avatar from '../Avatar';

import { ReactComponent as Badge1 } from './assets/badge1.svg';
import { ReactComponent as Badge2 } from './assets/badge2.svg';

const Author = ({ owner }: { owner: Creator }) => {
  const { profileImgUrl, user, address } = owner;
  return (
    <div>
      <Flex align="center" mb={10}>
        <Avatar src={profileImgUrl} size="md" name={address} />
        <Box ml={5} mr={2}>
          <Badge1 />
        </Box>
        <Badge2 />
      </Flex>
      <Heading size="lg">@{user?.username || ''}</Heading>
    </div>
  );
};

export default Author;
