import readFile from 'helpers/readFile';
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

import * as S from './styles';

const CoverUpload = ({ onChange }: { onChange: (val: string) => void }) => {
  const [preview, setPreview] = useState('');
  const onDrop = useCallback(
    async (acceptedFiles) => {
      // Do something with the files
      if (!acceptedFiles?.length) return;
      const res = await readFile(acceptedFiles[0]);
      setPreview(res);
      onChange(res);
    },
    [onChange]
  );
  const { getRootProps, getInputProps, isDragAccept, isDragReject } =
    useDropzone({
      onDrop,
      accept: 'image/gif, image/jpeg, image/png',
    });

  return (
    <S.CoverDropzone
      {...getRootProps()}
      isAccept={isDragAccept}
      isReject={isDragReject}
    >
      <input {...getInputProps()} />
      {preview ? (
        <S.CoverPreview>
          <img src={preview} alt="" />
        </S.CoverPreview>
      ) : (
        <>
          <strong>Add a cover image to your profile page.</strong>
          <p>
            We recommend at least 1680x340, otherwise the system will assing a
            color automatically.
          </p>
        </>
      )}
    </S.CoverDropzone>
  );
};

export default CoverUpload;
