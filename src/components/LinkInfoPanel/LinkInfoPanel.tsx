import { FC } from "react";
import { LinkInfoPanelProps } from "./LinkInfoPanel.types";
import { IconWrapper, Title, Wrapper } from "./LinkInfoPanel.styled";
import { ChevronRightSmall } from "../icons/ChevronRightSmall";

export const LinkInfoPanel: FC<LinkInfoPanelProps> = ({
   icon,
   title,
   link,
   loader,
}) => {
   return (
      <Wrapper>
         <IconWrapper>{icon}</IconWrapper>

         {!loader.state ? <Title>{title}</Title> : loader.view}
         {link && <ChevronRightSmall />}
      </Wrapper>
   );
};
