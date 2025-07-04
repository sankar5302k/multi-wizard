import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export type DataCardProps = {
  label: string;
  icon: LucideIcon;
  amount: string;
  description: string;
};

export default function DataCard(props: DataCardProps) {
  return (
    <DataCardContent>
      <section className="flex justify-between gap-2">
        {/* label */}
        <p className="text-sm">{props.label}</p>
        {/* icon */}
        <props.icon className="h-4 w-4 text-gray-400" />
      </section>
      <section className="flex flex-col gap-1">
        <h2 className="text-2xl font-semibold">{props.amount}</h2>
        <p className="text-xs text-gray-500">{props.description}</p>
      </section>
    </DataCardContent>
  );
}

export function DataCardContent(props: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={cn(
        'flex w-full flex-col gap-3 rounded-xl border p-5 shadow',
        props.className,
      )}
    />
  );
}
