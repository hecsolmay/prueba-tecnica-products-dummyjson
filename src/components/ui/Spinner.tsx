import { cn } from '@/lib/cn'

type SpinnerProps = React.HTMLAttributes<HTMLDivElement>

export default function Spinner ({ className, ...props }: SpinnerProps) {
  return (
    <div
      className={cn(
        'size-4 animate-spin rounded-full border-2 border-b-transparent',
        className
      )}
      {...props}
    />
  )
}
