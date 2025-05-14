import { proxyActivities } from '@temporalio/workflow';
import { UploadFileActivity } from '../upload-file.activity';

export const { uploadFileFromUrl } = proxyActivities<UploadFileActivity>({
  startToCloseTimeout: '1 minute',
  retry: {
    initialInterval: '30 seconds',
    maximumAttempts: 3,
  },
});

export const { storeFile } = proxyActivities<UploadFileActivity>({
  startToCloseTimeout: '1 minute',
  retry: {
    initialInterval: '30 seconds',
    maximumAttempts: 3,
  },
});
