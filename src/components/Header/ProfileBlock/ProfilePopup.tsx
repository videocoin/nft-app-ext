import Avatar from 'components/Avatar';
import View from 'components/UI/View';
import cutString from 'helpers/cutString';
import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useClickAway } from 'react-use';
import routes from 'routes';
import { Account } from 'types/account';
import { map } from 'lodash/fp';

import * as S from './styles';
import { COIN } from 'const';
import { TokenBalance } from 'types/balance';

const ProfilePopup = ({
  isOpen,
  onClose,
  data,
}: {
  isOpen: boolean;
  onClose: () => void;
  data: {
    balance: string;
    tokens: TokenBalance[];
  } & Account;
}) => {
  const nodeRef = useRef<HTMLDivElement>(null);
  useClickAway(nodeRef, () => {
    onClose();
  });
  const { balance, user, address, profileImgUrl } = data;
  const cutAddress = cutString(address, 5, 4);
  return isOpen ? (
    <S.Popup ref={nodeRef}>
      <S.Name>{user.name}</S.Name>
      <S.Address>{cutAddress}</S.Address>
      <S.BalancePopup>
        <Avatar name={address} src={profileImgUrl} />
        <View marginL={10}>
          <S.BalanceTitle>Balance</S.BalanceTitle>
          <S.Balance>
            {balance} {COIN}
          </S.Balance>
        </View>
      </S.BalancePopup>
      {map(({ symbol, balance }) => {
        return (
          <S.BalancePopup key={symbol}>
            <View marginL={10}>
              <S.BalanceTitle>Balance</S.BalanceTitle>
              <S.Balance key={symbol}>
                {balance} {symbol}
              </S.Balance>
            </View>
          </S.BalancePopup>
        );
      }, data.tokens)}
      <Link to={routes.profile} onClick={onClose}>
        My profile
      </Link>
      <Link to={routes.profile} onClick={onClose}>
        My arts
      </Link>
      <Link to={routes.profile} onClick={onClose}>
        Activity
      </Link>
    </S.Popup>
  ) : null;
};

export default ProfilePopup;
