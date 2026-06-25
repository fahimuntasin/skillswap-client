"use client"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircleIcon } from "lucide-react"
import { api } from "@/lib/api"

export default function PaymentSuccessPage() {
  const params = useSearchParams()
  const sessionId = params.get("session_id")
  const [data, setData] = useState<any>(null)
  const [error, setError] = useState("")

  useEffect(() => {
    if (sessionId) {
      api.confirmPayment(sessionId).then(async (payment: any) => {
        let taskTitle = ""
        try {
          const task = await api.getTask(payment.task_id)
          taskTitle = task?.title || ""
        } catch {}
        setData({ ...payment, taskTitle })
      }).catch(() => setError("Failed to verify payment"))
    }
  }, [sessionId])

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4 sm:px-6">
      <div className="text-center max-w-[480px]">
        {error ? (
          <>
            <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-full bg-red-50 dark:bg-red-900/20">
              <span className="text-3xl">✕</span>
            </div>
            <h1 className="text-[28px] font-bold text-[#0F172A] dark:text-[#f8fafc] mb-2">Payment Failed</h1>
            <p className="text-[#64748B] dark:text-[#94a3b8]">{error}</p>
          </>
        ) : data ? (
          <>
            <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-full bg-emerald-50 dark:bg-emerald-900/20">
              <CheckCircleIcon className="size-8 text-emerald-500" />
            </div>
            <h1 className="text-[28px] font-bold text-[#0F172A] dark:text-[#f8fafc] mb-2">Payment Successful!</h1>
            <p className="text-[#64748B] dark:text-[#94a3b8] text-lg mb-6">Your payment has been processed securely.</p>
            <div className="rounded-xl border border-[#F1F5F9] dark:border-[#2a2a3e] bg-white dark:bg-[#1c1a3a] p-5 text-left mb-8">
              <div className="grid gap-3 text-sm">
                <div className="flex justify-between"><span className="text-[#64748B]">Task</span><span className="font-semibold text-[#0F172A] dark:text-[#f8fafc]">{data.taskTitle || "Task"}</span></div>
                <div className="flex justify-between"><span className="text-[#64748B]">Freelancer</span><span className="font-semibold text-[#0F172A] dark:text-[#f8fafc]">{data.freelancer_email}</span></div>
                <div className="flex justify-between"><span className="text-[#64748B]">Amount</span><span className="font-semibold text-[#0F172A] dark:text-[#f8fafc]">${data.amount}</span></div>
                <div className="flex justify-between"><span className="text-[#64748B]">Transaction ID</span><span className="text-xs text-[#94A3B8]">{data.transaction_id}</span></div>
              </div>
            </div>
            <Link href="/dashboard/client"><Button variant="plastic" className="px-8">Go to Dashboard</Button></Link>
          </>
        ) : (
          <div className="animate-pulse text-[#64748B]">Verifying payment...</div>
        )}
      </div>
    </div>
  )
}
