import { FC } from "react";
import { LinkInfoPanelProps } from "./LinkInfoPanel.types";
import { IconWrapper, Title, Wrapper } from "./LinkInfoPanel.styled";
import { ChevronRightSmall } from "../icons/ChevronRightSmall";

export const LinkInfoPanel: FC<LinkInfoPanelProps> = ({ icon, title }) => {
  return (
    <Wrapper>
      <IconWrapper>{icon}</IconWrapper>
      <Title>{title}</Title>
      <ChevronRightSmall />
    </Wrapper>
  );
};
