import { UUID } from '@app/common/types';
import {
  uploadFileFromUrl,
  storeFile,
} from '@app/modules/temporal/activities/proxy/upload-file.proxy';

export async function uploadFileWorkflow(
  url: string,
  fileId: UUID,
): Promise<void> {
  try {
    const uploadResult = await uploadFileFromUrl(url);

    await storeFile(url, fileId, uploadResult);
  } catch (error) {
    // Different ways to handle an error, for example, sending a notification or changing the status of file in the db
    console.error(`Failed to upload file from URL ${url}:`, error.message);
    throw new Error('Upload workflow failed');
  }
}
