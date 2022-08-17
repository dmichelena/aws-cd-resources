import * as cdk from '@aws-cdk/core';
import * as sns from '@aws-cdk/aws-sns';
import * as lambda from '@aws-cdk/aws-lambda';


export class ResourcesStack extends cdk.Stack {

  constructor(scope: cdk.App, id: string, props: cdk.StackProps) {
    super(scope, id, props);
    const topics = ['user_registered', 'paid_order'];

    for (const topicName of topics) {
      const topic = new sns.Topic(this, topicName, { topicName });
      const topicReference = topicName.replace(/_/g, '-') + '-arn';
      new cdk.CfnOutput(this, topicReference, {
        value: topic.topicArn,
        exportName: topicReference,
      });
    }

    const layer = new lambda.LayerVersion(this, 'sns-lib', {
      code: lambda.Code.fromAsset(`${__dirname}/../layers/sns-lib`),
      compatibleRuntimes: [ lambda.Runtime.NODEJS_14_X],
    });

    new cdk.CfnOutput(this, 'sns-lib-layer', {
      value: layer.layerVersionArn,
      exportName: 'sns-lib-layer',
    });
  }
}
