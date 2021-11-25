import Button from 'components/UI/Button';
import View from 'components/UI/View';
import { COIN } from 'const';
import { makeBidOrder } from 'lib/opensea';
import { toFixedNoRound } from 'lib/utils';
import { find } from 'lodash/fp';
import { observer } from 'mobx-react-lite';
import { EventType } from 'opensea-js';
import { FungibleToken } from 'opensea-js/lib/types';
import { makeBigNumber } from 'opensea-js/lib/utils/utils';
import { useRef, useState } from 'react';
import { useQueryClient } from 'react-query';
import { useUnmount } from 'react-use';
import { useStore } from 'store';
import { Asset } from 'types/asset';

import { ModalBody, ModalContent } from '@chakra-ui/react';
import { formatEther } from '@ethersproject/units';

import AssetPreview from './AssetPreview';
import StatusBlock, { Status } from './StatusBlock';
import * as S from './styles';
import Success from './Success';

interface ModalData {
  asset: Asset;
  token: FungibleToken;
}

const PlaceBid = () => {
  const { ethBalance, openSea, account } = useStore('metamaskStore');
  const { modals, closeModal } = useStore('modalsStore');
  const onClose = () => closeModal('placeBid');
  const modalData = useRef<ModalData>(
    modals.get('placeBid') as unknown as ModalData
  );
  const { asset, token } = modalData.current;
  const { media } = asset;
  const featuredMedia = find({ featured: true }, media);
  const formattedEthBalance = toFixedNoRound(formatEther(ethBalance), 2);
  const [bidPrice, setBidPrice] = useState<number>();
  const [status, setStatus] = useState(Status.init);
  const queryClient = useQueryClient();
  // TODO: temporary
  const minBidValue = makeBigNumber(asset.auction.currentBid).add(0.1);

  const onPlaceBid = async () => {
    if (!openSea) return;
    setStatus(Status.start);
    openSea.addListener(EventType.CreateOrder, () => {
      setStatus(Status.orderCreated);
    });
    openSea.addListener(EventType.ApproveOrder, () => {
      setStatus(Status.orderCreated);
    });
    openSea.addListener(EventType.OrderDenied, () => {
      setStatus(Status.error);
    });
    try {
      await makeBidOrder(openSea, {
        account,
        item: asset,
        tokenAddress: asset.auction.paymentTokenAddress,
        bidPrice,
      });

      await Promise.all([
        queryClient.invalidateQueries(['spotlight', 'featured']),
        queryClient.invalidateQueries(['assets', asset.id]),
      ]);
      setStatus(Status.complete);
    } catch (err) {
      console.log(err);
      setStatus(Status.error);
    }
  };
  useUnmount(() => {
    if (openSea) {
      openSea.removeAllListeners();
    }
  });

  const isProcessing = Boolean(status);
  const isSuccess = Boolean(status === Status.complete);
  const symbol = token?.symbol || COIN;

  const renderBidBlock = () => {
    return (
      <>
        <S.BidBlock>
          <S.MinBidTitle>You must bid at least</S.MinBidTitle>
          <S.MinBid>
            {minBidValue.toString()} {symbol}
          </S.MinBid>
          <S.InputWrapper>
            <S.BidInput
              allowNegative={false}
              thousandSeparator
              onValueChange={({ floatValue }: any) => {
                setBidPrice(floatValue);
              }}
            />
            <S.VIDBadge>{symbol}</S.VIDBadge>
          </S.InputWrapper>
        </S.BidBlock>
        <S.USDValue>$0.00</S.USDValue>
        <S.Balance>
          <div>Your balance</div>
          <div>
            {formattedEthBalance} {COIN}
          </div>
        </S.Balance>
      </>
    );
  };

  return (
    <ModalContent>
      <ModalBody>
        {isProcessing ? (
          isSuccess ? (
            <Success asset={asset} />
          ) : (
            <StatusBlock status={status} />
          )
        ) : (
          <AssetPreview asset={asset} media={featuredMedia} />
        )}
        {isProcessing && !isSuccess && <S.ProgressBar status={status} />}

        {!status && (
          <>
            {renderBidBlock()}
            <View marginT={30} column>
              <Button
                disabled={!bidPrice || minBidValue.greaterThan(bidPrice)}
                onClick={onPlaceBid}
              >
                Place bid
              </Button>
            </View>
            <S.Footer>Bids placed in auction cannot be withdrawn.</S.Footer>
          </>
        )}
        {status > 0 && (
          <View marginT={10} column>
            {(isSuccess ||
              // status === Status.init ||
              status === Status.error) && (
              <Button onClick={onClose} theme="secondary">
                {isSuccess || status === Status.error ? 'Close' : 'Cancel'}
              </Button>
            )}
          </View>
        )}
      </ModalBody>
    </ModalContent>
  );
};

export default observer(PlaceBid);
