import { Center, Flex, Heading, Spinner, Text } from '@chakra-ui/react';

export enum Status {
  init,
  start,
  matchOrders,
  transactionCreated,
  transactionConfirmed,
  transferred,
  error,
  complete,
}

const statuses: any = {
  [Status.start]: {
    title: 'Processing your purchase',
    description: 'Sending transaction using your wallet.',
  },

  [Status.matchOrders]: {
    title: 'Processing',
    description: 'Sending transaction using your wallet.',
  },
  [Status.transactionCreated]: {
    title: 'Proof of Ownership',
    description: 'Transfering...',
  },
  [Status.transactionConfirmed]: {
    title: 'Transfer Complete',
    description: 'Almost done...',
  },
  [Status.error]: {
    title: 'Error',
    description: 'Try again',
  },
};

const StatusBlock = ({ status }: { status: Status }) => {
  const currentStatus = statuses[status];
  return (
    <>
      <Heading size="lg" mb={4}>
        Purchasing
      </Heading>
      <Flex align="center">
        {status !== Status.error && (
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
          <Text>{currentStatus.description}</Text>
        </div>
      </Flex>
    </>
  );
};

export default StatusBlock;
