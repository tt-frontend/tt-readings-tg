import { useParams } from "react-router-dom";
import { deviceProfileService } from "./deviceProfileService.models";
import { useUnit } from "effector-react";
import { deviceQuery } from "./deviceProfileService.api";
import { Skeleton } from "antd";
import { DeviceProfilePage } from "./DeviceProfilePage";

const {
  gates: { DeviceGate },
} = deviceProfileService;

export const DeviceProfileContainer = () => {
  const { id } = useParams<{ id: string }>();

  const { device, isLoading } = useUnit({
    device: deviceQuery.$data,
    isLoading: deviceQuery.$pending,
  });

  console.log(id);

  if (!id) return null;

  console.log(device);

  return (
    <>
      <DeviceGate deviceId={Number(id)} />
      {isLoading && <Skeleton active />}
      {device && !isLoading && <DeviceProfilePage device={device} />}
    </>
  );
};
