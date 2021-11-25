import mediaApi from 'api/media';
import { FileItem, useUploading } from 'components/UploadPage/helpers';
import { ReactComponent as FileUploadIcon } from 'icons/fileUpload.svg';
import { ReactComponent as FolderIcon } from 'icons/folder.svg';
import { ReactComponent as LockIcon } from 'icons/lock.svg';
import { ReactComponent as TrashIcon } from 'icons/trash.svg';
import { ReactComponent as UnlockIcon } from 'icons/unlock.svg';
import { map } from 'lodash/fp';
import { observer } from 'mobx-react-lite';
import pluralize from 'pluralize';
import prettyBytes from 'pretty-bytes';
import React, { ChangeEvent, useCallback, useEffect, useMemo } from 'react';
import { useDropzone } from 'react-dropzone';
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form';
import { useMount, useToggle } from 'react-use';
import { Media } from 'types/media';

import {
  Box,
  Center,
  CircularProgress,
  CircularProgressLabel,
  Flex,
  Heading,
  Spacer,
  Spinner,
  Switch,
  Text,
} from '@chakra-ui/react';
import { ErrorMessage } from '@hookform/error-message';

const extBg: Record<string, string> = {
  jpeg: '#E2486A',
  jpg: '#E2486A',
  gif: '#E2486A',
  png: '#E2486A',
  quicktime: '#7549D4',
  mp4: '#7549D4',
  mpeg: '#ED6858',
};

const extName: Record<string, string> = {
  jpeg: 'JPG',
  jpg: 'JPG',
  gif: 'GIF',
  png: 'PNG',
  quicktime: 'MOV',
  mp4: 'MOV',
  mpeg: 'MP3',
};

const UploadingItem = observer(
  ({
    item,
    idx,
    onUpload,
  }: {
    item: FileItem & Media;
    idx: number;
    onUpload: (media: Media, index: number) => void;
  }) => {
    const handleUpload = useCallback(
      (media: Media) => onUpload(media, idx),
      [idx, onUpload]
    );
    const [state, send] = useUploading(handleUpload);
    const config = useMemo(
      () => ({
        onUploadProgress: function (progressEvent: ProgressEvent) {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          send({
            type: 'SET_PROGRESS',
            value: {
              progress: percentCompleted,
              fileSize: progressEvent.total,
              loadedSize: progressEvent.loaded,
            },
          });
        },
      }),
      [send]
    );

    const upload = useCallback(async () => {
      const form = new FormData();
      form.append('file', item.file);
      try {
        const { id } = await mediaApi.upload(form, config);
        send({ type: 'UPLOADED', value: id });
      } catch {
        send('ERROR');
      }
    }, [config, item, send]);

    useMount(() => {
      upload();
    });

    const ext = item.file.type.split('/').pop() as string;
    const renderSize = () => {
      switch (state.value) {
        case 'uploading':
          return `${prettyBytes(state.context.loadedSize)} of ${prettyBytes(
            state.context.fileSize
          )}`;
        case 'uploaded':
        case 'processing':
        case 'processed':
          return prettyBytes(state.context.fileSize);
        default:
          return null;
      }
    };
    const renderRight = () => {
      switch (state.value) {
        case 'uploading':
          return (
            <CircularProgress
              size="60px"
              value={state.context.progress}
              color="purple.600"
              thickness="5px"
            >
              <CircularProgressLabel>
                {state.context.progress}%
              </CircularProgressLabel>
            </CircularProgress>
          );
        case 'processing':
          return (
            <Center boxSize="60px" flexDir="column">
              <Spinner speed="1s" color="purple.500" />
              <Text fontSize="xs">Processing</Text>
            </Center>
          );
        default:
          return (
            <CircularProgress
              size="60px"
              value={state.context.progress}
              color="purple.600"
              thickness="5px"
            >
              <CircularProgressLabel>
                {state.context.progress}%
              </CircularProgressLabel>
            </CircularProgress>
          );
      }
    };

    return (
      <Flex p={4}>
        <Center
          boxSize="60px"
          borderRadius="xl"
          bg={extBg[ext] || '#7549D4'}
          mr={4}
        >
          <Text fontWeight="bold" color="white" textTransform="uppercase">
            {extName[ext] || 'FILE'}
          </Text>
        </Center>
        <Box>
          <Text fontWeight="600">{item.file.name}</Text>
          <Text>{renderSize()}</Text>
        </Box>
        <Spacer />
        <Box>{renderRight()}</Box>
      </Flex>
    );
  }
);

const UploadedItem = ({
  item,
  idx,
  onRemove,
}: {
  onRemove: (index: number) => void;
  item: Media;
  idx: number;
}) => {
  const handleRemove = useCallback(() => onRemove(idx), [idx, onRemove]);
  const ext = item.contentType.split('/').pop() as string;
  return (
    <Flex p={4}>
      <Center
        boxSize="60px"
        borderRadius="xl"
        bg={extBg[ext] || '#7549D4'}
        mr={4}
      >
        <Text fontWeight="bold" color="white" textTransform="uppercase">
          {extName[ext] || 'FILE'}
        </Text>
      </Center>
      <Box>
        <Text fontWeight="600">{item.name}</Text>
        <Text>{prettyBytes(item.size)}</Text>
      </Box>
      <Spacer />
      <Center
        boxSize="60px"
        bg="gray.50"
        as="button"
        onClick={handleRemove}
        borderRadius="xl"
      >
        <TrashIcon />
      </Center>
    </Flex>
  );
};

const ContentUpload = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const [isCollapsed, toggleCollapse] = useToggle(true);
  const isLocked = useWatch({
    name: 'locked',
  });
  const { fields, append, update, remove } = useFieldArray({
    name: 'contentItems',
  });
  const handleRemoveAll = useCallback(() => remove(), [remove]);
  const onDrop = useCallback(
    (files: File[]) => {
      append(map((file) => ({ file }), files));
    },
    [append]
  );
  const { getRootProps, getInputProps, rootRef } = useDropzone({
    onDrop,
    accept:
      'video/mp4, video/quicktime, image/jpeg, image/png, image/gif, image/webp, audio/mpeg, text/*, application/*',
  });
  const onAdd = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      append(map((file) => ({ file }), e.target.files));
    }
  };
  const onUpload = useCallback(
    (item: Media, index: number) => {
      update(index, { ...item, itemId: item.id });
    },
    [update]
  );
  useEffect(() => {
    if (errors.contentItems && !errors.previewItems) {
      rootRef.current?.scrollIntoView();
    }
  }, [errors.contentItems, errors.previewItems, rootRef]);
  return (
    <Box
      bg="white"
      p={8}
      borderWidth="1px"
      borderColor="gray.100"
      borderRadius="4xl"
    >
      <Flex align="center">
        <Heading size="md">Content</Heading>
        <Spacer />
      </Flex>
      {!fields.length ? (
        <Box
          mt={5}
          bg="gray.50"
          borderRadius="xl"
          border="4px dashed #EDF0F4"
          p={10}
          {...getRootProps()}
          align="center"
          mb={6}
        >
          <input {...getInputProps()} />
          <FileUploadIcon width={24} height={24} />
          <Heading color="gray.400" size="sm" mt={1}>
            Drag & Drop Files
          </Heading>
          <Text fontWeight="600">
            or{' '}
            <Text as="span" color="purple.500">
              browse media on your device
            </Text>
          </Text>
          <Text color="gray.400">
            Any JPEG, PNG, GIF, MOV, MP3, MP4, ZIP, PDF or TXT.
          </Text>
        </Box>
      ) : (
        <Box my={4} borderWidth="1px" borderColor="gray.100" borderRadius="4xl">
          <Flex p={4} align="center">
            <Center boxSize="40px" bg="gray.50" borderRadius="lg">
              <FolderIcon />
            </Center>
            <Text ml={2}>{pluralize('File', fields.length, true)}</Text>
            <Spacer />
            <Box
              as="label"
              cursor="pointer"
              px={4}
              py={2}
              bg="gray.50"
              borderRadius="lg"
            >
              <Box d="none">
                <input type="file" onChange={onAdd} multiple />
              </Box>
              <Text fontWeight="bold" color="purple.500">
                + Add More
              </Text>
            </Box>
            <Box
              ml={2}
              px={4}
              py={2}
              as="button"
              bg="gray.50"
              borderRadius="lg"
              type="button"
              onClick={handleRemoveAll}
            >
              <Text fontWeight="bold" color="pink.500">
                Remove all
              </Text>
            </Box>
          </Flex>
          <Box maxH={isCollapsed ? '276' : 'auto'} overflow="hidden">
            {(fields as (FileItem & Media)[]).map(
              (file: FileItem & Media, index) =>
                file.status === 'READY' ? (
                  <UploadedItem
                    key={file.id}
                    onRemove={remove}
                    item={file}
                    idx={index}
                  />
                ) : (
                  <UploadingItem
                    item={file}
                    key={file.id}
                    idx={index}
                    onUpload={onUpload}
                  />
                )
            )}
          </Box>
          {fields.length > 3 && (
            <Box py={4} mx={4} borderTop="1px solid #E4E8ED">
              <Box as="button" type="button" w="100%" onClick={toggleCollapse}>
                <Text>{isCollapsed ? 'All files' : 'Collapse'}</Text>
              </Box>
            </Box>
          )}
        </Box>
      )}
      {!fields.length && (
        <ErrorMessage
          as={Text}
          fontSize="sm"
          mt={2}
          color="red.500"
          errors={errors}
          name="contentItems"
        />
      )}
    </Box>
  );
};

export default ContentUpload;
