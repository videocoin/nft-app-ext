import React, { ChangeEvent, useState } from 'react';
import * as S from './styles';
import readFile from 'helpers/readFile';
import Avatar from 'components/Avatar';

const AvatarUpload = ({
  name,
  defaultValue,
  onChange,
}: {
  name: string;
  defaultValue: string;
  onChange: (val: string) => void;
}) => {
  const [preview, setPreview] = useState(defaultValue);
  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (!files?.length) return;
    const res = await readFile(files[0]);
    setPreview(res);
    onChange(res);
  };
  return (
    <S.UploadAvatar>
      <Avatar size="xl" name={name} src={preview} />
      <S.UploadTitle>Profile photo</S.UploadTitle>
      <S.UploadDescription>
        We recommend an image of at least 400x400. Gifs work too 🙌
      </S.UploadDescription>
      <S.UploadButton>
        <input type="file" onChange={handleChange} />
        Upload
      </S.UploadButton>
    </S.UploadAvatar>
  );
};

export default AvatarUpload;
