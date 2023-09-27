type PersonalNumber = {
  id: number;
  number: string;
};

export type PersonalNumbersPanelProps = {
  personalNumbers: PersonalNumber[];
  selectedNumber?: number;
  handleSelect: (id: number) => void;
};
