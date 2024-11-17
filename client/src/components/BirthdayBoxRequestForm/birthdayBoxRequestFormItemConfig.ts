export interface BirthdayBoxRequestFormItemConfig {
  label: string;
  type: string;
  initialValue?: string;
  options?: { [value: string]: string };
}

export type BirthdayBoxRequestFormConfig = {
  [id: string]: BirthdayBoxRequestFormItemConfig;
};
