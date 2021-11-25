import { ReactComponent as LockIcon } from 'icons/lock.svg';
import React from 'react';

import { Center, Text } from '@chakra-ui/react';

const LockInfo = () => (
  <Center
    flexDirection="column"
    top={0}
    left={0}
    backdropBlur={2}
    boxSize="100%"
    pos="absolute"
  >
    <LockIcon fill="white" />
    <Text color="white" fontSize="xl">
      Purchase to Unlock
    </Text>
  </Center>
);

export default LockInfo;
