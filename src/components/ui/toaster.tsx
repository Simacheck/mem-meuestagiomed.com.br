"use client"

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"
import { AlertTriangle, PartyPopper } from "lucide-react";

export function Toaster() {
  const { toasts } = useToast()
  const alert = {alert: <AlertTriangle />, sucess: <PartyPopper />}
  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, icon, description, action, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className="grid gap-1">
              {title && (
                <ToastTitle className="flex items-center">
                  {icon ? <div className="pr-2">{alert[icon]}</div> : ""} {title}
                </ToastTitle>
              )}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  )
}
