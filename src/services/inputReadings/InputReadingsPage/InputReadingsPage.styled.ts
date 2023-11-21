import { Segmented } from "antd";
import { styled } from "styled-components";

export const Title = styled.div`
  color: #000;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px;
`;

export const ResourceSection = styled.div`
  margin-top: 16px;
`;

export const SectionTitle = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;
  color: #000;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
`;

export const DevicesWrapper = styled.div`
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const SegmentedWrapper = styled.div`
  margin: 24px 0;
`;

export const SegmentedSC = styled(Segmented)`
  height: 44px;
  border-radius: 12px;
  transition: 0.2s;
  padding: 4px;
  background-color: #eeeff0;

  * {
    border-radius: 8px !important;
  }

  .ant-segmented-item {
    border-radius: 8px;
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .ant-segmented-item-selected {
    font-weight: 600;
    background-color: white !important;
  }
`;

export const NoDeviceButton = styled.div`
  margin-top: 16px;
`;
