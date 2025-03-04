import { FC } from "react";
import { DeviceWrapper, Wrapper } from "./DevicesList.styled";
import { Props } from "./DevicesList.types";

export const DevicesList: FC<Props> = ({ devices }) => {
  return (
    <Wrapper>
      {devices.map((device) => (
        <DeviceWrapper
          path=""
          title={<strong>{device.serialNumber}</strong>}
          description={device.mountPlace}
          key={device.id}
        />
      ))}
    </Wrapper>
  );
};
