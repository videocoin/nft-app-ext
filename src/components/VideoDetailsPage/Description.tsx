import React from 'react';
import * as S from './styles';

const Description = (props: any) => {
  const { text } = props;
  return (
    <div>
      <S.SectionTitle>Description</S.SectionTitle>
      <S.DescriptionText>
        <p>
          {text}
        </p>
      </S.DescriptionText>
    </div>
  );
};

export default Description;
