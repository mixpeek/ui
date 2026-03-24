import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{ts,tsx}'],
  prefix: 'mxp-',
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--mxp-border))',
        input: 'hsl(var(--mxp-input))',
        ring: 'hsl(var(--mxp-ring))',
        background: 'hsl(var(--mxp-background))',
        foreground: 'hsl(var(--mxp-foreground))',
        primary: {
          DEFAULT: 'hsl(var(--mxp-primary))',
          foreground: 'hsl(var(--mxp-primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--mxp-secondary))',
          foreground: 'hsl(var(--mxp-secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--mxp-destructive))',
          foreground: 'hsl(var(--mxp-destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--mxp-muted))',
          foreground: 'hsl(var(--mxp-muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--mxp-accent))',
          foreground: 'hsl(var(--mxp-accent-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--mxp-card))',
          foreground: 'hsl(var(--mxp-card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--mxp-popover))',
          foreground: 'hsl(var(--mxp-popover-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--mxp-radius)',
        md: 'calc(var(--mxp-radius) - 2px)',
        sm: 'calc(var(--mxp-radius) - 4px)',
      },
    },
  },
  plugins: [],
} satisfies Config;
