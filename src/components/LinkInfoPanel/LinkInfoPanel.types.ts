import { ReactNode } from "react";

export type LinkInfoPanelProps = {
   icon: ReactNode;
   title: string;
   loader?: {
      state: boolean;
      view: ReactNode;
   };
   link?: string;
};
