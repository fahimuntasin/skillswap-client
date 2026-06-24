import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex flex-1 items-center justify-center py-20">
      <div className="text-center max-w-md px-4">
        <p className="text-8xl font-bold text-primary/20">404</p>
        <h1 className="mt-4 text-2xl font-bold text-foreground">Page not found</h1>
        <p className="mt-2 text-muted-foreground">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <Link href="/">
            <Button variant="plastic">Go Home</Button>
          </Link>
          <Link href="/tasks">
            <Button variant="outline">Browse Tasks</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
