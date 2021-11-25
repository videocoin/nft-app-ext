import { useCallback } from 'react';
import Countdown, { CountdownRenderProps } from 'react-countdown';

import { Box, HStack, Text } from '@chakra-ui/react';

const BidCountdown = ({
  date,
  size = 'lg',
}: {
  date: number;
  size?: 'lg' | 'sm';
}) => {
  const renderer = useCallback(
    ({ formatted: { hours, minutes, seconds } }: CountdownRenderProps) => (
      <HStack spacing={size === 'lg' ? 6 : 4}>
        <Box>
          <Text fontWeight={700} fontSize={size === 'lg' ? '4xl' : 'xl'}>
            {hours}
          </Text>
          <Text color="gray.500" fontSize={size === 'lg' ? 'xl' : 'sm'}>
            Hours
          </Text>
        </Box>
        <Box>
          <Text fontWeight={700} fontSize={size === 'lg' ? '4xl' : 'xl'}>
            {minutes}
          </Text>
          <Text color="gray.500" fontSize={size === 'lg' ? 'xl' : 'sm'}>
            Minutes
          </Text>
        </Box>
        <Box>
          <Text fontWeight={700} fontSize={size === 'lg' ? '4xl' : 'xl'}>
            {seconds}
          </Text>
          <Text color="gray.500" fontSize={size === 'lg' ? 'xl' : 'sm'}>
            Seconds
          </Text>
        </Box>
      </HStack>
    ),
    [size]
  );
  return <Countdown daysInHours date={date} renderer={renderer} />;
};

export default BidCountdown;
