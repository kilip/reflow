
export enum ThemeLayout {
  default = 'default',
  full = 'full'
}

export type UI = {
  layout: ThemeLayout
}

export enum ToastType {
  success = 'success',
  info = 'info',
  error = 'error',
  warning = 'warning'
}

export type Toast = {
  id: number
  message: string
  type: ToastType
}

export enum ToastActionType {
  ADD = 'ADD_TOAST',
  REMOVE = 'DELETE_TOAST'
}

export type ToastAction = {
  type: ToastActionType,
  payload: Toast
}

export type ToastState = {
  toasts: Toast[]
}

export type ToastContextProps = {
  success: (message: string) => void
  info: (message: string) => void
  error: (message: string) => void
  warning: (message: string) => void
  remove: (toast: Toast) => void
}

export type ThemeContextProps = {
  loading: boolean
  setLoading: (loading: boolean) => void
}

export enum ThemeActionType {
  Loading = 'loading'
}

export type ThemeAction = {
  type: ThemeActionType
  payload: object
}

export type ThemeState = {
  loading: boolean
}
