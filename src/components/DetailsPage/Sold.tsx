import Avatar from 'components/Avatar';
import View from 'components/UI/View';
import { COIN } from 'const';
import { find } from 'lodash/fp';
import { observer } from 'mobx-react-lite';
import { useStore } from 'store';
import { Asset } from 'types/asset';

import { Button, HStack, SimpleGrid, Text } from '@chakra-ui/react';

import * as S from './styles';
const Sold = observer(
  ({ asset, isOwner }: { asset: Asset; isOwner: boolean }) => {
    const { openModal } = useStore('modalsStore');
    const { paymentTokens } = useStore('metamaskStore');
    const { instantSalePrice, isAuction, owner, auction } = asset;
    const handlePutOnSale = () => openModal('putOnSale', { asset });
    const { paymentTokenAddress, currentBid } = auction;
    const token = find({ address: paymentTokenAddress }, paymentTokens);
    const symbol = token?.symbol || COIN;
    return (
      <S.Bid>
        <SimpleGrid columns={2}>
          <div>
            <Text fontSize="xl" fontWeight={500}>
              Sold for
            </Text>
            <Text fontSize="4xl" fontWeight={700}>
              {isAuction ? currentBid : instantSalePrice} {symbol}
            </Text>
            <Text color="gray.500" fontSize="xl">
              $10,021.77
            </Text>
          </div>
          <div>
            <Text fontSize="xl" fontWeight={500}>
              Owned by
            </Text>
            <View row centerV>
              <Avatar name={owner.address} src={owner.profileImgUrl} />
              <S.OwnerName>@{owner.user.username}</S.OwnerName>
            </View>
          </div>
        </SimpleGrid>
        {isOwner && (
          <HStack mt={4}>
            <Button flex={1} onClick={handlePutOnSale}>
              Put on sale
            </Button>
          </HStack>
        )}
      </S.Bid>
    );
  }
);

export default Sold;
