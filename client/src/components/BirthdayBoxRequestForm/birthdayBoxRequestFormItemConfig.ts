import { Dayjs } from 'dayjs';

export interface BirthdayBoxRequestFormItemConfig {
  label: string;
  type: string;
  initialValue?: string | boolean | number | Dayjs | null;
  options?: { [value: string]: string | boolean };
}

export type BirthdayBoxRequestFormConfig = {
  [id: string]: BirthdayBoxRequestFormItemConfig;
};
