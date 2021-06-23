import React, { useRef } from 'react';
import Modal from 'components/UI/Modal';
import View from 'components/UI/View';
import Button from 'components/UI/Button';
import { useStore } from 'store';
import { Asset } from 'types/asset';
import Avatar from 'components/Avatar';
import * as S from './styles';
import { toFixedNoRound } from 'lib/utils';
import { formatToken } from 'lib/units';

const PlaceBid = () => {
  const { vidBalance } = useStore('metamaskStore');
  const { modals, closeModal } = useStore('modalsStore');
  const onClose = () => closeModal('placeBid');
  const asset = useRef<Asset>(modals.get('placeBid')?.asset as Asset);
  const { thumbnailUrl, name, owner } = asset.current;
  const formattedVidBalance = toFixedNoRound(formatToken(vidBalance), 2);
  return (
    <Modal onClose={onClose}>
      <S.Title>Place a bid</S.Title>
      <S.AssetPreview>
        <View row centerV>
          <img width={134} height={76} src={thumbnailUrl} alt={name} />
          <View marginL={20}>
            <View row centerV marginB={16}>
              <Avatar name={owner.user.name} size="xxs" />
              <View marginL={10}>
                <S.Username>{`@${owner.user.username}`}</S.Username>
              </View>
            </View>
            <S.AssetName>{name}</S.AssetName>
          </View>
        </View>
      </S.AssetPreview>
      <S.BidBlock>
        <S.MinBidTitle>You must bid at least</S.MinBidTitle>
        <S.MinBid>501.00 VID</S.MinBid>
        <S.InputWrapper>
          <S.BidInput type="number" placeholder="0" min={0} />
          <S.VIDBadge>VID</S.VIDBadge>
        </S.InputWrapper>
      </S.BidBlock>
      <S.USDValue>$0.00</S.USDValue>
      <S.Balance>
        <div>Your balance</div>
        <div>{formattedVidBalance} VID</div>
      </S.Balance>
      <View marginT={30} column>
        <Button>Place bid</Button>
      </View>
      <S.Footer>Bids placed in auction cannot be withdrawn.</S.Footer>
    </Modal>
  );
};

export default PlaceBid;
