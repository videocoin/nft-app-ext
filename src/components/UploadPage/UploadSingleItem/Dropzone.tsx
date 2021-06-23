import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import * as S from './styles';
import { ReactComponent as VideoIcon } from 'icons/yt.svg';
import assetsApi from 'api/assets';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useStore } from './store';
import Spinner from 'components/UI/Spinner';
import View from 'components/UI/View';

const Dropzone = () => {
  const { setAsset } = useStore();
  const [progress, setProgress] = useState(0);
  const [isUploading, setUploading] = useState(false);
  const [isProcessing, setProcessing] = useState(false);
  const config = {
    onUploadProgress: function (progressEvent: ProgressEvent) {
      const percentCompleted = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      );
      setProgress(percentCompleted);
    },
  };

  const fetchAsset = async (id: number) => {
    const res = await assetsApi.fetchAsset(id);
    if (res.status === 'PROCESSING') {
      poll(id);
    } else {
      setAsset(res);
      setProgress(0);
      setUploading(false);
      setProcessing(false);
    }
    return res;
  };
  const poll = (id: number) => {
    setTimeout(() => fetchAsset(id), 1000);
  };
  const upload = async (file: File) => {
    setUploading(true);
    const form = new FormData();
    form.append('file', file);
    try {
      const res = await assetsApi.upload(form, config);
      setProcessing(true);
      poll(res.id);
    } catch {
      setProgress(0);
      setUploading(false);
      setProcessing(false);
    }
  };
  const onDrop = useCallback((acceptedFiles) => {
    if (!acceptedFiles.length) return;
    upload(acceptedFiles[0]);
  }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });
  return (
    <S.Dropzone {...getRootProps()}>
      <input {...getInputProps()} accept="video/mp4, video/mov" />
      {isProcessing ? (
        <div>
          <Spinner size="xl" />
          <View marginT={12}>Processing</View>
        </div>
      ) : isUploading ? (
        <S.Progress>
          <CircularProgressbar
            styles={buildStyles({
              pathColor: '#7549D4',
              textColor: '#7549D4',
            })}
            value={progress === 100 ? 99 : progress}
            text={`${progress === 100 ? 99 : progress}%`}
          />
        </S.Progress>
      ) : (
        <>
          <VideoIcon />
          <p>
            <strong>Drag & Drop File</strong>
            or <span>browse media on your device</span>
          </p>
        </>
      )}
    </S.Dropzone>
  );
};

export default Dropzone;
