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

  const load = async () => {
    const res = await describeInstance();
    setInstance(res);
  };

  useEffect(() => {
    load();
  }, []);

  const handleReload = async () => {
    await load();
    toast.success("Reloaded");
  };

  const handleStopInstance = async () => {
    await stopInstance();
    toast.success("Stopping the instance...");
    load();
  };

  const handleStartInstance = async () => {
    await startInstance();
    toast.success("Starting the instance...");
    load();
  };

  return (
    <main className="">
      <p>サーバー管理アプリ</p>
      <p>State: {instance?.state}</p>
      <p>Public IP Address: {instance?.publicIpAddress}</p>
      <button onClick={handleReload}>Reload</button>
      {instance?.state === "running" && (
        <button onClick={handleStopInstance}>Stop instance</button>
      )}
      {instance?.state === "stopped" && (
        <button onClick={handleStartInstance}>Start instance</button>
      )}
      <Toaster />
    </main>
  );
}
