export type ListPanelItem = {
  key: string;
  value?: string | null;
};

export type Props = {
  items: ListPanelItem[];
};
