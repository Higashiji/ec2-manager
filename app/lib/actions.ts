"use server";

const AWS = require("aws-sdk");

// AWS SDKの設定
AWS.config.update({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const ec2 = new AWS.EC2();

// インスタンスID
const instanceId = process.env.AWS_EC2_INSTANCE_ID;

export type InstanceState =
  | "pending"
  | "running"
  | "shutting-down"
  | "terminated"
  | "stopping"
  | "stopped";

// インスタンスの状態を取得
export type DescribeInstanceResult = {
  state: InstanceState;
  publicIpAddress: string;
};
export const describeInstance = async (): Promise<DescribeInstanceResult> => {
  console.log(`Describing instance: ${instanceId}`);

  const params = {
    InstanceIds: [instanceId],
  };

  const data = await ec2.describeInstances(params).promise();
  const instance = data.Reservations[0].Instances[0];
  const state = instance.State.Name;
  const publicIpAddress = instance.PublicIpAddress || "-";

  console.log(`Instance state: ${state}`);
  console.log(`Public IP address: ${publicIpAddress}`);
  return { state, publicIpAddress } as DescribeInstanceResult;
};

// インスタンスを起動
type StartInstanceResult = true;
export const startInstance = async (): Promise<StartInstanceResult> => {
  console.log(`Starting instance: ${instanceId}`);

  const params = {
    InstanceIds: [instanceId],
  };

  const data = await ec2.startInstances(params).promise();
  console.log(`Starting instance: ${instanceId}`);
  console.log(data.StartingInstances);
  return true;
};

// インスタンスを停止
type StopInstanceResult = true;
export const stopInstance = async (): Promise<StopInstanceResult> => {
  console.log(`Stopping instance: ${instanceId}`);

  const params = {
    InstanceIds: [instanceId],
  };

  const data = await ec2.stopInstances(params).promise();
  console.log(`Stopping instance: ${instanceId}`);
  console.log(data.StoppingInstances);

  return true;
};
