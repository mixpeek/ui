import * as React from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';

import { cn } from '../lib/cn';
import { Button } from './button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from './command';
import { Popover, PopoverContent, PopoverTrigger } from './popover';

export interface ComboboxOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface ComboboxProps {
  options: ComboboxOption[];
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyText?: string;
  className?: string;
  disabled?: boolean;
}

const Combobox = React.forwardRef<HTMLButtonElement, ComboboxProps>(
  (
    {
      options,
      value,
      onValueChange,
      placeholder = 'Select...',
      searchPlaceholder = 'Search...',
      emptyText = 'No results found.',
      className,
      disabled,
    },
    ref
  ) => {
    const [open, setOpen] = React.useState(false);

    const selected = options.find((opt) => opt.value === value);

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            ref={ref}
            variant="outline"
            role="combobox"
            aria-expanded={open}
            disabled={disabled}
            className={cn(
              'mxp-w-[200px] mxp-justify-between',
              !value && 'mxp-text-muted-foreground',
              className
            )}
          >
            {selected?.label || placeholder}
            <ChevronsUpDown className="mxp-ml-2 mxp-h-4 mxp-w-4 mxp-shrink-0 mxp-opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="mxp-w-[200px] mxp-p-0">
          <Command>
            <CommandInput placeholder={searchPlaceholder} />
            <CommandList>
              <CommandEmpty>{emptyText}</CommandEmpty>
              <CommandGroup>
                {options.map((option) => (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    disabled={option.disabled}
                    onSelect={(currentValue) => {
                      onValueChange?.(currentValue === value ? '' : currentValue);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        'mxp-mr-2 mxp-h-4 mxp-w-4',
                        value === option.value ? 'mxp-opacity-100' : 'mxp-opacity-0'
                      )}
                    />
                    {option.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    );
  }
);
Combobox.displayName = 'Combobox';

export { Combobox };
