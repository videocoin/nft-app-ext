import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../UI/Button';

import filecoin from './assets/filecoin.svg';
import videocoin from './assets/videocoin.svg';
import * as S from './styles';

const Demo = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState('');
  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setToken(e.target.value);
  const handleExplore = (e: FormEvent) => {
    e.preventDefault();
    navigate(`/arts/${token}`);
  };
  return (
    <S.Container>
      <S.Title>VideoNFT Demo</S.Title>
      <S.PoweredBy>
        <S.PoweredByTitle>Powered by</S.PoweredByTitle>
        <S.Logos>
          <div>
            <a
              href="https://videocoin.io"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={videocoin} alt="Videocoin" />
            </a>
          </div>
          <div>
            <a
              href="https://filecoin.io/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={filecoin} height={38} alt="Filecoin" />
            </a>
          </div>
        </S.Logos>
        <S.Form onSubmit={handleExplore}>
          <input
            placeholder="Token ID"
            onChange={handleChange}
            value={token}
            type="text"
          />
          <Button type="submit">Explore NFT</Button>
        </S.Form>
      </S.PoweredBy>
    </S.Container>
  );
};

export default Demo;
