export interface IBirthdayBoxRequestFormItemProps<T> {
  value: T;
  setValue: (value: T) => void;
  errorMessage: string;
  label: string;
}
