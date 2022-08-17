import * as cdk from '@aws-cdk/core';
import { ResourcesStack } from './lib/resources';

const app = new cdk.App();
new ResourcesStack(app, 'Resources', {
  env: {
    region: 'us-west-1',
  },
});