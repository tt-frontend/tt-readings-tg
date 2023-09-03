import { Folder } from "react-bootstrap-icons";
import { styled } from "styled-components";

export const NoConfigsWrapper = styled.div`
  border-radius: 16px;
  display: flex;
  padding: 16px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #85ccff;
  font-weight: 500;
  background-color: #f3faff;
`;

export const FolderSc = styled(Folder)`
  font-size: 32px;
  color: #b6e1ff;
`;

export const ExpiredAt = styled.div`
  background-color: #a7ffca;
  color: #0e4369;
  padding: 4px 8px;
  border-radius: 10px;
`;

export const QRImage = styled.img`
  width: 100%;
  height: auto;
`;
export const LogoImage = styled.img`
  width: 40px;
  height: 40px;
  position: absolute;
  top: calc(50%);
  left: calc(50%);
  transform: translate(-23px, -22px);
`;
