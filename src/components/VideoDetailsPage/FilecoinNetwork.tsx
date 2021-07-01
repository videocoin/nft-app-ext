import React from 'react';
import * as S from './styles';
import { ReactComponent as CloseIcon } from './assets/close.svg';
import Button from '../UI/Button';
import cutString from 'helpers/cutString';
import { useCopyToClipboard } from 'react-use';
import { toast } from 'react-toastify';

const FilecoinNetwork = ({
  data,
  onClose,
}: {
  data: any;
  onClose: () => void;
}) => {
  const [, copyToClipboard] = useCopyToClipboard();

  const handleCopy = () => {
    copyToClipboard(data.drmKey);
    toast.success('Copied');
  };
  return (
    <S.Modal>
      <S.FileCoinPopup>
        <S.CloseBtn onClick={onClose}>
          <CloseIcon />
        </S.CloseBtn>
        <S.EncryptionPopupTitle>Filecoin Network</S.EncryptionPopupTitle>
        <S.FileCoinRow>
          <S.FileCoinLabel>Name</S.FileCoinLabel>
          <S.FileCoinValue>{data.name}</S.FileCoinValue>
        </S.FileCoinRow>
        <S.FileCoinRow>
          <S.FileCoinLabel>Description</S.FileCoinLabel>
          <S.FileCoinValue>{data.description}</S.FileCoinValue>
        </S.FileCoinRow>
        <S.FileCoinRow>
          <S.FileCoinLabel>Image</S.FileCoinLabel>
          <S.FileCoinValue>
            <a
              href={data.thumbnailUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {cutString(data.thumbnailUrl, 34, 5)}
            </a>
          </S.FileCoinValue>
        </S.FileCoinRow>
        <S.FileCoinRow>
          <S.FileCoinLabel>Ext. Link Encrypted</S.FileCoinLabel>
          <S.FileCoinValue>
            <a
              href={data.encryptedUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {cutString(data.encryptedUrl, 34, 5)}
            </a>
          </S.FileCoinValue>
        </S.FileCoinRow>
        <S.FileCoinRow>
          <S.FileCoinLabel>DRM Key</S.FileCoinLabel>
          <S.FileCoinValue onClick={handleCopy}>
            {cutString(data.drmKey, 30, 4)}
          </S.FileCoinValue>
        </S.FileCoinRow>
        <S.FileCoinViewBtn>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={data.tokenUrl}
          >
            <Button>View on IPFS</Button>
          </a>
        </S.FileCoinViewBtn>
      </S.FileCoinPopup>
    </S.Modal>
  );
};

export default FilecoinNetwork;
