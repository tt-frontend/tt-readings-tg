import { FC } from "react";
import { HeaderProps } from "./Header.types";

export const Header: FC<HeaderProps> = ({ title }) => {
  return <div className="font-medium text-darkBlue text-2xl">{title}</div>;
};
