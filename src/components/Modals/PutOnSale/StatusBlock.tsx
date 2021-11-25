import { Center, Flex, Spinner, Text } from '@chakra-ui/react';

export enum Status {
  init,
  start,
  approveAllAssets,
  approveAsset,
  approveCurrency,
  createOrder,
  orderDenied,
  approveOrder,
  error,
  complete,
}

const statuses: any = {
  [Status.init]: {
    title: '',
    description: '',
  },

  [Status.start]: {
    title: 'Processing your request',
    description: 'Connecting to your wallet.',
  },

  [Status.approveAllAssets]: {
    title: 'Processing your request',
    description: 'Aproving assets.',
  },
  [Status.approveAsset]: {
    title: 'Processing your request',
    description: 'Aproving asset.',
  },
  [Status.approveCurrency]: {
    title: 'Processing your request',
    description: 'Aproving currency.',
  },
  [Status.createOrder]: {
    title: 'Processing your request',
    description: 'Creating order.',
  },
  [Status.approveOrder]: {
    title: 'Processing your request',
    description: 'Sending order.',
  },
  [Status.complete]: {
    title: 'Processing your request',
    description: 'Done',
  },
  [Status.error]: {
    title: 'Error',
    description: 'Try again',
  },
};

const StatusBlock = ({ status }: { status: Status }) => {
  if (status == Status.init) return <></>;
  const currentStatus = statuses[status];
  return (
    <Flex align="center">
      {status !== Status.error && status !== Status.complete && (
        <Center boxSize="60px" mr={5}>
          <Spinner
            size="xl"
            speed="1s"
            color="purple.500"
            emptyColor="gray.200"
          />
        </Center>
      )}
      <div>
        <Text fontWeight={700} fontSize="xl">
          {currentStatus.title}
        </Text>
        <Text fontSize="xl">{currentStatus.description}</Text>
      </div>
    </Flex>
  );
};

export default StatusBlock;
