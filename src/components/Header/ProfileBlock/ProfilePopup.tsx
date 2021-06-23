import React, { useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import * as S from './styles';
import { useClickAway } from 'react-use';
import { Account } from 'types/account';
import cutString from 'helpers/cutString';
import Avatar from 'components/Avatar';
import View from 'components/UI/View';
import { Link } from 'react-router-dom';
import routes from 'routes';

const ProfilePopup = ({
  isOpen,
  onClose,
  data,
}: {
  isOpen: boolean;
  onClose: () => void;
  data: {
    balance: string;
  } & Account;
}) => {
  const nodeRef = useRef<HTMLDivElement>(null);
  useClickAway(nodeRef, () => {
    onClose();
  });
  const { balance, user, address, profileImgUrl } = data;
  const cutAddress = cutString(address, 5, 4);
  return (
    <CSSTransition
      nodeRef={nodeRef}
      in={isOpen}
      timeout={300}
      classNames="fade"
      unmountOnExit
    >
      <S.Popup ref={nodeRef}>
        <S.Name>{user.name}</S.Name>
        <S.Address>{cutAddress}</S.Address>
        <S.BalancePopup>
          <Avatar name={address} src={profileImgUrl} />
          <View marginL={10}>
            <S.BalanceTitle>Balance</S.BalanceTitle>
            <S.Balance>{balance} VID</S.Balance>
          </View>
        </S.BalancePopup>
        <Link to={routes.profile} onClick={onClose}>
          My profile
        </Link>
        <Link to={routes.profile} onClick={onClose}>
          My videos
        </Link>
        <Link to={routes.profile} onClick={onClose}>
          Activity
        </Link>
      </S.Popup>
    </CSSTransition>
  );
};

export default ProfilePopup;
