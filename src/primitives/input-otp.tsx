import * as React from 'react';
import { OTPInput, OTPInputContext } from 'input-otp';
import { Minus } from 'lucide-react';

import { cn } from '../lib/cn';

const InputOTP = React.forwardRef<
  React.ElementRef<typeof OTPInput>,
  React.ComponentPropsWithoutRef<typeof OTPInput>
>(({ className, containerClassName, ...props }, ref) => (
  <OTPInput
    ref={ref}
    containerClassName={cn(
      'mxp-flex mxp-items-center mxp-gap-2 has-[:disabled]:mxp-opacity-50',
      containerClassName
    )}
    className={cn('disabled:mxp-cursor-not-allowed', className)}
    {...props}
  />
));
InputOTP.displayName = 'InputOTP';

const InputOTPGroup = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<'div'>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('mxp-flex mxp-items-center', className)}
    {...props}
  />
));
InputOTPGroup.displayName = 'InputOTPGroup';

const InputOTPSlot = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<'div'> & { index: number }
>(({ index, className, ...props }, ref) => {
  const inputOTPContext = React.useContext(OTPInputContext);
  const slot = inputOTPContext.slots[index];

  return (
    <div
      ref={ref}
      className={cn(
        'mxp-relative mxp-flex mxp-h-10 mxp-w-10 mxp-items-center mxp-justify-center mxp-border-y mxp-border-r mxp-border-input mxp-text-sm mxp-transition-all first:mxp-rounded-l-md first:mxp-border-l last:mxp-rounded-r-md',
        slot?.isActive && 'mxp-z-10 mxp-ring-2 mxp-ring-ring mxp-ring-offset-background',
        className
      )}
      {...props}
    >
      {slot?.char}
      {slot?.hasFakeCaret && (
        <div className="mxp-pointer-events-none mxp-absolute mxp-inset-0 mxp-flex mxp-items-center mxp-justify-center">
          <div className="mxp-h-4 mxp-w-px mxp-animate-caret-blink mxp-bg-foreground mxp-duration-1000" />
        </div>
      )}
    </div>
  );
});
InputOTPSlot.displayName = 'InputOTPSlot';

const InputOTPSeparator = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<'div'>
>(({ ...props }, ref) => (
  <div ref={ref} role="separator" {...props}>
    <Minus className="mxp-h-4 mxp-w-4" />
  </div>
));
InputOTPSeparator.displayName = 'InputOTPSeparator';

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };
