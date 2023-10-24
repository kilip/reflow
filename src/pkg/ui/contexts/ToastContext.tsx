'use client'

import { PropsWithChildren, createContext, useContext, useReducer } from 'react';
import { Toast, ToastAction, ToastActionType, ToastContextProps, ToastState, ToastType } from '../types';
import ToastContainer from '../views/ToastContainer';

function toastReducer(state: ToastState, action: ToastAction){
  const { type, payload } = action

  switch(type){
    case ToastActionType.ADD:
      return {
        ...state,
        toasts: [...state.toasts, payload]
      }
    case ToastActionType.REMOVE:
      const updated = state.toasts.filter(
        (toast) => {
          return toast.id !== payload.id
        }
      )
      return {
        ...state,
        toasts: updated
      }
    default:
      throw new Error('Unhandled action type: ' + type)
  }
}

const ToastContext = createContext<ToastContextProps|undefined>(undefined)

export default function ToastProvider({children}: PropsWithChildren) {
  const [state, dispatch] = useReducer(toastReducer, { toasts: []})

  const addToast = (type: ToastType, message: string) => {
    const id = Math.floor(Math.random() * 10000000)
    dispatch({type: ToastActionType.ADD, payload: {id, type, message}})
  }

  const remove = (toast: Toast) => {
    dispatch({type: ToastActionType.REMOVE, payload: toast })
  }

  const success = (message: string) => {
    addToast(ToastType.success, message)
  }

  const info = (message: string) => {
    addToast(ToastType.info, message)
  }

  const error = (message: string) => {
    addToast(ToastType.error, message)
  }

  const warning = (message: string) => {
    addToast(ToastType.warning, message)
  }

  const value = { success, info, error, warning, remove}
  return (
    <ToastContext.Provider value={value}>
      <ToastContainer toasts={state.toasts}/>
      {children}
    </ToastContext.Provider>
  )
}

export function useToastContext(): ToastContextProps {
  const context = useContext(ToastContext) as ToastContextProps | undefined

  if(!context){
    throw Error(
      'useSearchContext should be used within SearchProvider'
    )
  }

  return context
}
