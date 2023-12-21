import { FC } from "react";
import { LinkInfoPanelProps } from "./LinkInfoPanel.types";
import { IconWrapper, Title, Wrapper } from "./LinkInfoPanel.styled";
import { ChevronRightSmall } from "../icons/ChevronRightSmall";
import { useNavigate } from "react-router-dom";

export const LinkInfoPanel: FC<LinkInfoPanelProps> = ({
   icon,
   title,
   link,
   loader,
}) => {

   const navigate = useNavigate();
  
   return (
      <Wrapper onClick={() => link && navigate(link)}>
         <IconWrapper>{icon}</IconWrapper>

         {!loader?.state ? <Title>{title}</Title> : loader.view}
         {link && <ChevronRightSmall />}
      </Wrapper>
   );

};
