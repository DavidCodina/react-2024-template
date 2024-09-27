// See react-select's Select.d.ts in node_modules for complete type definitions.

import Select, { CSSObjectWithLabel } from 'react-select'

// These are NOT used in IReactSelect, but exported for the consumer.
export type SelectOption = { value: string; label: string; [key: string]: any }
export type SelectValue = SelectOption | SelectOption[] | null

// Important: Unlike in a normal react-select, className
// & style will be applied to the control. Moreover,
// the classNames & styles props have been omitted.
// className?: string // already part of Select props.
export type IReactSelect = {
  disabled?: boolean
  error?: string // errors?.xxx?.message from react-hook-form
  formGroupClassName?: string
  formGroupStyle?: React.CSSProperties
  formText?: string
  formTextClassName?: string
  formTextStyle?: React.CSSProperties
  label?: string // Could be React.ReactNode, but string is okay for now.
  labelClassName?: string
  labelRequired?: boolean
  labelStyle?: React.CSSProperties
  size?: 'sm' | 'lg'
  style?: React.CSSProperties | CSSObjectWithLabel
  touched?: boolean
} & Omit<
  React.ComponentProps<typeof Select>,
  | 'classNames'
  | 'styles'
  // This is omitted because the blur can happen before the controlled state value is updated.
  // This would then lead to a false negative validation error.
  | 'blurInputOnSelect'
>
