"use client";

import { useEffect, useState } from "react";
import {
  DescribeInstanceResult,
  describeInstance,
  startInstance,
  stopInstance,
} from "./lib/actions";
import toast, { Toaster } from "react-hot-toast";

export default function Home() {
  const [instance, setInstance] = useState<DescribeInstanceResult>();

  useEffect(() => {
    (async () => {
      const res = await describeInstance();
      setInstance(res);
    })();
  }, []);

  const handleStopInstance = async () => {
    await stopInstance();
    toast.success("Stopping the instance...");
  };

  const handleReload = async () => {
    const res = await describeInstance();
    setInstance(res);
  };

  const handleStartInstance = async () => {
    await startInstance();
    toast.success("Starting the instance...");
  };

  return (
    <main className="">
      <p>サーバー管理アプリ</p>
      <p>State: {instance?.state}</p>
      <p>Public IP Address: {instance?.publicIpAddress}</p>
      <button onClick={handleStopInstance}>Stop instance</button>
      <button onClick={handleReload}>Reload</button>
      <button onClick={handleStartInstance}>Start instance</button>
      <Toaster />
    </main>
  );
}
