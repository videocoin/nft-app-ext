import mediaApi from 'api/media';
import { FileItem, useUploading } from 'components/UploadPage/helpers';
import { ReactComponent as CloseIcon } from 'icons/close.svg';
import { ReactComponent as EyeIcon } from 'icons/eye.svg';
import { ReactComponent as FileUploadIcon } from 'icons/fileUpload.svg';
import audioBg from 'img/audio_bg.jpg';
import { map } from 'lodash/fp';
import { observer } from 'mobx-react-lite';
import React, { ChangeEvent, forwardRef, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { ReactSortable } from 'react-sortablejs';
import { useMount } from 'react-use';
import { Media } from 'types/media';

import {
  Box,
  Center,
  CircularProgress,
  CircularProgressLabel,
  Flex,
  Heading,
  Image,
  SimpleGrid,
  Spacer,
  Spinner,
  Text,
} from '@chakra-ui/react';
import { ErrorMessage } from '@hookform/error-message';

const UploadingItem = observer(
  ({
    item,
    idx,
    onUpload,
  }: {
    item: FileItem;
    idx: number;
    onUpload: (media: Media, index: number) => void;
  }) => {
    const handleUpload = (media: Media) => onUpload(media, idx);
    const [state, send] = useUploading(handleUpload);
    const config = {
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
    };

    const upload = async () => {
      const form = new FormData();
      form.append('file', item.file);
      form.append('featured', 'true');
      try {
        const { id } = await mediaApi.upload(form, config);
        send({ type: 'UPLOADED', value: id });
      } catch {
        send('ERROR');
      }
    };
    useMount(() => {
      upload();
    });

    const render = () => {
      switch (state.value) {
        case 'uploading': {
          return (
            <Center
              boxSize={150}
              border="1px solid"
              borderColor="gray.100"
              borderRadius="20"
            >
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
            </Center>
          );
        }
        case 'processing': {
          return (
            <Center
              boxSize={150}
              border="1px solid"
              borderColor="gray.100"
              borderRadius="20"
              flexDir="column"
            >
              <Spinner speed="1s" color="purple.500" />
              <Text fontSize="xs">Processing</Text>
            </Center>
          );
        }
        default:
          return (
            <Center
              boxSize={150}
              border="1px solid"
              borderColor="gray.100"
              borderRadius="20"
            >
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
            </Center>
          );
      }
    };
    return <>{render()}</>;
  }
);

const UploadedItem = ({
  item,
  onRemove,
  idx,
}: {
  item: Media;
  idx: number;
  onRemove: (index: number) => void;
}) => {
  const handleRemove = () => onRemove(idx);
  const render = () => {
    switch (item.mediaType) {
      case 'video':
        return (
          <Box boxSize="150px">
            <Box
              as="video"
              borderRadius={20}
              w="100%"
              h="100%"
              objectFit="cover"
              src={item.url}
            />
          </Box>
        );
      case 'image':
        return (
          <Image
            borderRadius={20}
            objectFit="cover"
            boxSize="150px"
            src={item.url}
            alt=""
          />
        );
      case 'audio':
        return (
          <Image
            borderRadius={20}
            objectFit="cover"
            boxSize="150px"
            src={audioBg}
            alt=""
          />
        );
      default:
        return (
          <Center
            borderRadius={20}
            objectFit="cover"
            boxSize="150px"
            bg="#7549D4"
          >
            <Heading color="white" fontSize="xl">
              FILE
            </Heading>
          </Center>
        );
    }
  };
  return (
    <Box pos="relative">
      {render()}
      <Center
        w={30}
        h={30}
        borderRadius="full"
        pos="absolute"
        bg="gray.900"
        border="1px solid white"
        as="button"
        right={2.5}
        top={2.5}
        type="button"
        onClick={handleRemove}
      >
        <CloseIcon fill="white" />
      </Center>
    </Box>
  );
};

const SortableList = forwardRef<HTMLDivElement>(({ children }, ref) => {
  return (
    <SimpleGrid mb={6} columns={4} spacing={2.5} ref={ref}>
      {children}
    </SimpleGrid>
  );
});

const PreviewUpload = () => {
  const { setValue, formState } = useFormContext();
  const { fields, append, update, remove } = useFieldArray({
    name: 'previewItems',
  });
  const onSort = (items: (Media | FileItem)[]) => {
    setValue('previewItems', items);
  };
  const onUpload = (item: Media, index: number) => {
    update(index, { ...item, itemId: item.id });
  };
  const onDrop = useCallback(
    (files: File[]) => {
      append(map((file) => ({ file }), files));
    },
    [append]
  );
  const { getRootProps, getInputProps, rootRef } = useDropzone({
    onDrop,
    accept: 'video/mp4, image/jpeg, image/png, image/gif, audio/mpeg',
  });
  const onAdd = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      append(map((file) => ({ file }), e.target.files));
    }
  };

  useEffect(() => {
    if (formState.errors.previewItems) {
      rootRef.current?.scrollIntoView();
    }
  }, [formState.errors.previewItems, rootRef]);

  return (
    <Box
      bg="white"
      p={8}
      borderWidth="1px"
      borderColor="gray.100"
      borderRadius="4xl"
    >
      <Flex align="center" mb={5}>
        <Heading size="md">Preview</Heading>
        <Spacer />
        <Text>This content is visible to everyone</Text>
        <Center ml={2} boxSize="40px" bg="gray.50" borderRadius={12}>
          <EyeIcon />
        </Center>
      </Flex>
      {!fields.length ? (
        <Box
          bg="gray.50"
          borderRadius="xl"
          border="4px dashed #EDF0F4"
          p={10}
          {...getRootProps()}
          align="center"
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
          <Text color="gray.400">Any JPEG, PNG, GIF, MP3, MP4</Text>
        </Box>
      ) : (
        <Box
          padding={6}
          borderWidth="1px"
          borderColor="gray.100"
          borderRadius="4xl"
        >
          <ReactSortable
            tag={SortableList}
            list={fields as (FileItem & Media)[]}
            setList={onSort}
            delayOnTouchStart
          >
            {(fields as (FileItem & Media)[]).map(
              (file: FileItem & Media, index) =>
                file.url ? (
                  <UploadedItem
                    item={file}
                    key={file.id}
                    idx={index}
                    onRemove={remove}
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
          </ReactSortable>
          <Center
            h="60px"
            width="100%"
            as="label"
            bg="gray.50"
            borderRadius={20}
            cursor="pointer"
          >
            <Box d="none">
              <input type="file" onChange={onAdd} multiple />
            </Box>
            <Text align="center" fontWeight="bold" color="purple.500">
              + Add More
            </Text>
          </Center>
        </Box>
      )}

      {!fields.length && (
        <ErrorMessage
          as={Text}
          fontSize="sm"
          mt={2}
          color="red.500"
          errors={formState.errors}
          name="previewItems"
        />
      )}
    </Box>
  );
};

export default PreviewUpload;
