export type Props = {
  value?: number | null;
  handleCange: (value: number | null) => void;
  placeholder: string;
  prevReadingValue?: number | null;
  prevReadingDate?: string;
  unit: string;
};
