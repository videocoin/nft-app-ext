import React from 'react';
import * as S from './styles';
import Container from '../UI/Container';
import View from '../UI/View';
import Button from '../UI/Button';
import multipleIcon from './assets/multiple.png';
import singleIcon from './assets/single.png';

const UploadPage = () => {
  return (
    <S.Wrapper>
      <Container>
        <S.Title>Upload Video Item</S.Title>
        <S.Description>
          Choose <strong>“Single”</strong> if you want your collectible to be
          one of a kind or <strong>“Multiple”</strong> if you want to sell one
          collectible multiple times.
        </S.Description>
        <View row>
          <S.LinkCard to="/upload/single">
            <div>
              <img src={singleIcon} width={176} height={149} alt="" />
            </div>
            <Button size="lg" theme="secondary">
              Create Single
            </Button>
          </S.LinkCard>
          <S.LinkCard to="/upload/single">
            <div>
              <img src={multipleIcon} width={216} height={189} alt="" />
            </div>
            <Button size="lg">Create Multiple</Button>
          </S.LinkCard>
        </View>
        <S.Hint>
          We do not own your private keys and cannot access your funds without
          your confirmation.
        </S.Hint>
      </Container>
    </S.Wrapper>
  );
};

export default UploadPage;
