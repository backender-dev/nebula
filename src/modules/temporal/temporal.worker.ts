import { TemporalModule } from 'nestjs-temporal';
import { NativeConnection, Runtime } from '@temporalio/worker';
import { UploadFileActivity } from './activities/upload-file.activity';
import { ConfigService } from '@nestjs/config';

const activityClasses = [UploadFileActivity];

export const TemporalWorkerModule = TemporalModule.registerWorkerAsync({
  imports: [],
  inject: [ConfigService],
  useFactory: async (config: ConfigService) => {
    Runtime.install({});
    const connection = await NativeConnection.connect({
      address: config.get('TEMPORAL_HOST'),
    });

    return {
      workerOptions: {
        connection,
        namespace: config.get('TEMPORAL_NAMESPACE') || 'default',
        maxConcurrentActivityTaskExecutions:
          config.get('TEMPORAL_MAX_CONCURRENT_ACTIVITY_TASK_EXECUTIONS') || 10,
        maxConcurrentLocalActivityExecutions:
          config.get('TEMPORAL_MAX_CONCURRENT_LOCAL_ACTIVITY_EXECUTIONS') || 10,
        maxTaskQueueActivitiesPerSecond:
          config.get('TEMPORAL_MAX_TASK_QUEUE_ACTIVITIES_PER_SECOND') || 10,
        maxConcurrentWorkflowTaskExecutions:
          config.get('TEMPORAL_MAX_CONCURRENT_WORKFLOW_TASK_EXECUTIONS') || 10,
        maxConcurrentActivityTaskPolls:
          config.get('TEMPORAL_MAX_CONCURRENT_ACTIVITY_TASK_POLLS') || 10,
        maxActivitiesPerSecond:
          config.get('TEMPORAL_MAX_ACTIVITIES_PER_SECOND') || 10,
        taskQueue: config.get('TEMPORAL_QUEUE'),
        workflowsPath: require.resolve('./workflows'),
      },
      activityClasses,
    };
  },
});
