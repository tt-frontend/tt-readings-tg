import { styled } from "styled-components";
import { Divider, Skeleton } from "antd";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const InfoLinksWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const ActionsTitle = styled.div`
  color: #000;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px;
  letter-spacing: -0.4px;
`;

export const ActionsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const LongSkeleton = styled(Skeleton.Input)`
  width: 300px !important;
`;

export const DividerSC = styled(Divider)`
  margin: 8px 0;
`;
