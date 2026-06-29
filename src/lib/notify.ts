import { toast } from "sonner"

export function notifySuccess(title: string, description?: string) {
  toast.success(title, {
    description,
    duration: 4500,
  })
}

export function notifyError(title: string, description?: string) {
  toast.error(title, {
    description,
    duration: 5000,
  })
}

export function notifyLoading(title: string) {
  return toast.loading(title)
}
