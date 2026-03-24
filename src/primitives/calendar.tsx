import * as React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { DayPicker } from 'react-day-picker';

import { cn } from '../lib/cn';
import { buttonVariants } from './button';

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn('mxp-p-3', className)}
      classNames={{
        months: 'mxp-flex mxp-flex-col sm:mxp-flex-row mxp-space-y-4 sm:mxp-space-x-4 sm:mxp-space-y-0',
        month: 'mxp-space-y-4',
        caption: 'mxp-flex mxp-justify-center mxp-pt-1 mxp-relative mxp-items-center',
        caption_label: 'mxp-text-sm mxp-font-medium',
        nav: 'mxp-space-x-1 mxp-flex mxp-items-center',
        nav_button: cn(
          buttonVariants({ variant: 'outline' }),
          'mxp-h-7 mxp-w-7 mxp-bg-transparent mxp-p-0 mxp-opacity-50 hover:mxp-opacity-100'
        ),
        nav_button_previous: 'mxp-absolute mxp-left-1',
        nav_button_next: 'mxp-absolute mxp-right-1',
        table: 'mxp-w-full mxp-border-collapse mxp-space-y-1',
        head_row: 'mxp-flex',
        head_cell:
          'mxp-text-muted-foreground mxp-rounded-md mxp-w-9 mxp-font-normal mxp-text-[0.8rem]',
        row: 'mxp-flex mxp-w-full mxp-mt-2',
        cell: 'mxp-h-9 mxp-w-9 mxp-text-center mxp-text-sm mxp-p-0 mxp-relative [&:has([aria-selected].day-range-end)]:mxp-rounded-r-md [&:has([aria-selected].day-outside)]:mxp-bg-accent/50 [&:has([aria-selected])]:mxp-bg-accent first:[&:has([aria-selected])]:mxp-rounded-l-md last:[&:has([aria-selected])]:mxp-rounded-r-md focus-within:mxp-relative focus-within:mxp-z-20',
        day: cn(
          buttonVariants({ variant: 'ghost' }),
          'mxp-h-9 mxp-w-9 mxp-p-0 mxp-font-normal aria-selected:mxp-opacity-100'
        ),
        day_range_end: 'day-range-end',
        day_selected:
          'mxp-bg-primary mxp-text-primary-foreground hover:mxp-bg-primary hover:mxp-text-primary-foreground focus:mxp-bg-primary focus:mxp-text-primary-foreground',
        day_today: 'mxp-bg-accent mxp-text-accent-foreground',
        day_outside:
          'day-outside mxp-text-muted-foreground mxp-opacity-50 aria-selected:mxp-bg-accent/50 aria-selected:mxp-text-muted-foreground aria-selected:mxp-opacity-30',
        day_disabled: 'mxp-text-muted-foreground mxp-opacity-50',
        day_range_middle:
          'aria-selected:mxp-bg-accent aria-selected:mxp-text-accent-foreground',
        day_hidden: 'mxp-invisible',
        ...classNames,
      }}
      components={{
        IconLeft: ({ ..._props }) => <ChevronLeft className="mxp-h-4 mxp-w-4" />,
        IconRight: ({ ..._props }) => <ChevronRight className="mxp-h-4 mxp-w-4" />,
      }}
      {...props}
    />
  );
}
Calendar.displayName = 'Calendar';

export { Calendar };
