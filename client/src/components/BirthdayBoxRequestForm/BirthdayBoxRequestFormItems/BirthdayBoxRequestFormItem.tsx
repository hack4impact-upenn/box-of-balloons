/* eslint-disable no-case-declarations */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import BirthdayBoxRequestFormDropdownItem, {
  BirthdayBoxRequestFormDropdownItemProps,
} from './BirthdayBoxRequestFormDropdownItem';
import BirthdayBoxRequestFormParagraphItem, {
  BirthdayBoxRequestFormParagraphItemProps,
} from './BirthdayBoxRequestFormParagraphItem';
import BirthdayBoxRequestFormSelectItem, {
  BirthdayBoxRequestFormSelectItemProps,
} from './BirthdayBoxRequestFormSelectItem';

export type BirthdayBoxRequestFormItemProps = { type: string } & (
  | BirthdayBoxRequestFormParagraphItemProps
  | BirthdayBoxRequestFormDropdownItemProps
  | BirthdayBoxRequestFormSelectItemProps
);

function BirthdayBoxRequestFormItem(props: BirthdayBoxRequestFormItemProps) {
  const { type } = props;

  switch (type) {
    case 'dropdown':
      const dropdownProps = props as BirthdayBoxRequestFormDropdownItemProps;
      return <BirthdayBoxRequestFormDropdownItem {...dropdownProps} />;
    case 'paragraph':
      const paragraphProps = props as BirthdayBoxRequestFormParagraphItemProps;
      return <BirthdayBoxRequestFormParagraphItem {...paragraphProps} />;
    case 'select':
      const selectProps = props as BirthdayBoxRequestFormSelectItemProps;
      return <BirthdayBoxRequestFormSelectItem {...selectProps} />;
    default:
      throw new Error(`Invalid type: ${type}`);
  }
}

export default BirthdayBoxRequestFormItem;
