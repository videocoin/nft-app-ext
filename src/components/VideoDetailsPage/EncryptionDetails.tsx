import React from 'react';
import QRCode from 'react-qr-code';
import * as S from './styles';
import View from '../UI/View';
import { ReactComponent as CopyIcon } from './assets/copy.svg';
import { ReactComponent as CloseIcon } from './assets/close.svg';
import { useCopyToClipboard } from 'react-use';
import { toast } from 'react-toastify';
import cutString from 'helpers/cutString';

const EncryptionDetails = ({
  onClose,
  drmKey,
}: {
  onClose: () => void;
  drmKey: string;
}) => {
  const cutAddress = cutString(drmKey, 5, 4);
  const [, copyToClipboard] = useCopyToClipboard();

  const handleCopy = () => {
    copyToClipboard(drmKey);
    toast.success('Copied');
  };
  return (
    <S.Modal>
      <S.EncryptionPopup>
        <S.CloseBtn onClick={onClose}>
          <CloseIcon />
        </S.CloseBtn>
        <S.EncryptionPopupTitle>Encryption Details</S.EncryptionPopupTitle>
        <View row centerH marginV={60}>
          <QRCode value={drmKey} size={340} />
        </View>
        <S.EncryptionAddress>
          {cutAddress}
          <S.CopyBtn onClick={handleCopy}>
            <CopyIcon />
          </S.CopyBtn>
        </S.EncryptionAddress>
      </S.EncryptionPopup>
    </S.Modal>
  );
};

export default EncryptionDetails;
