'use client'

import * as React from 'react'
import { toast as sonnerToast, type ExternalToast } from 'sonner'

type ToastInput = Omit<ExternalToast, 'description'> & {
  title?: React.ReactNode
  description?: React.ReactNode
}

function toast({ title, description, ...options }: ToastInput) {
  if (title !== undefined) {
    return sonnerToast(title, { ...options, description })
  }

  if (description !== undefined) {
    return sonnerToast(description, options)
  }

  return sonnerToast('', options)
}

function useToast() {
  return {
    toast,
    dismiss: (toastId?: string) => sonnerToast.dismiss(toastId),
  }
}

export { useToast, toast }
