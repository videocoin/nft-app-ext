import mediaApi from 'api/media';
import { Media } from 'types/media';

import useStateMachine, { t } from '@cassiozen/usestatemachine';

export interface FileItem {
  file: File;
  id: string;
}

export const useUploading = (onUpload: (media: Media) => void) => {
  return useStateMachine({
    schema: {
      context: t<{
        progress: number;
        assetId: number | null;
        asset: Media | null;
        fileSize: number;
        loadedSize: number;
      }>(),
      events: {
        SET_PROGRESS: t<{
          value: { progress: number; fileSize: number; loadedSize: number };
        }>(),
        UPLOADED: t<{ value: number }>(),
      },
    },
    context: {
      progress: 0,
      fileSize: 0,
      loadedSize: 0,
      assetId: null,
      asset: null,
    },
    initial: 'waiting',
    states: {
      waiting: {},
      uploading: {
        on: {
          UPLOADED: 'uploaded',
          ERROR: 'waiting',
        },
        effect({ setContext, event }) {
          setContext((c) => ({ ...c, ...event.value }));
        },
      },
      uploaded: {
        on: {
          SUCCESS: 'processing',
        },
        effect({ setContext, event, send }) {
          setContext((c) => ({ ...c, assetId: event.value }));
          send('SUCCESS');
        },
      },
      processing: {
        on: {
          ERROR: 'waiting',
          SUCCESS: 'processed',
          PROCESSING: 'processing',
        },
        effect({ context, setContext, send }) {
          const fetchMedia = async () => {
            if (!context.assetId) return;
            try {
              const asset = await mediaApi.fetchMedia(context.assetId);
              if (asset.status === 'PROCESSING') {
                send('PROCESSING');
              } else {
                setContext((c) => ({ ...c, asset }));
                send('SUCCESS');
              }
            } catch {
              send('ERROR');
            }
          };
          const timeout = setTimeout(() => {
            fetchMedia();
          }, 2000);
          return () => clearTimeout(timeout);
        },
      },
      processed: {
        effect({ context }) {
          if (context.asset) {
            onUpload(context.asset);
          }
        },
      },
    },
    on: {
      SET_PROGRESS: 'uploading',
    },
  });
};
