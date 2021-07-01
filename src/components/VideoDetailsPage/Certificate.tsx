import React, { useCallback, useRef, useState } from 'react';
import { map } from 'lodash/fp';
import * as S from './styles';
import videocoin from './assets/videocoin.png';
import filecoin from './assets/filecoin.png';
import codepen from './assets/codepen.png';
import EncryptionDetails from './EncryptionDetails';
import FilecoinNetwork from './FilecoinNetwork';

interface CertificateItem {
  name: string;
  icon: string;
  popup?: string;
  link?: string;
}

const CertItem = ({
  item: { name, icon, popup, link },
  onClick,
}: {
  item: CertificateItem;
  onClick: (popup: string) => void;
}) => {
  const handleClick = () => onClick(popup || '');
  return (
    <S.CertItem
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      href={link}
    >
      <img width={40} height={40} src={icon} alt={name} />
      <div>{name}</div>
    </S.CertItem>
  );
};

const Certificate = (props: any) => {
  const { data } = props;
  const certificates = useRef<CertificateItem[]>([
    {
      name: 'View on VideCoin network',
      icon: videocoin,
      link: `https://rinkeby.etherscan.io/token/${data.assetContract.address}?a=${data.tokenId}`,
    },
    {
      name: 'View on FileCoin network',
      icon: filecoin,
      popup: 'filecoin',
    },
    {
      name: 'View encryption details',
      icon: codepen,
      popup: 'encryption',
    },
  ]);
  const [popup, setPopup] = useState<string | null>(null);
  const handleClose = () => {
    setPopup(null);
  };
  const openPopup = (popup: string) => setPopup(popup);
  const renderItem = useCallback(
    (item: CertificateItem) => (
      <CertItem item={item} key={item.name} onClick={openPopup} />
    ),
    []
  );

  return (
    <div>
      <S.SectionTitle>Proof of Ownership</S.SectionTitle>
      <div>{map(renderItem, certificates.current)}</div>
      {popup === 'encryption' && (
        <EncryptionDetails onClose={handleClose} drmKey={data.drmKey} />
      )}
      {popup === 'filecoin' && (
        <FilecoinNetwork data={data} onClose={handleClose} />
      )}
    </div>
  );
};

export default Certificate;
