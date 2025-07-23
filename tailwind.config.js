/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
        "./public/index.html",
        "./components/**/*.{js,jsx,ts,tsx}",
        "./pages/**/*.{js,jsx,ts,tsx}",
        "./app/**/*.{js,jsx,ts,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                // Base colors using CSS variables
                background: 'hsl(var(--color-background) / <alpha-value>)',
                foreground: 'hsl(var(--color-foreground) / <alpha-value>)',

                // Card colors
                card: {
                    DEFAULT: 'hsl(var(--color-card) / <alpha-value>)',
                    foreground: 'hsl(var(--color-card-foreground) / <alpha-value>)',
                },

                // Popover colors
                popover: {
                    DEFAULT: 'hsl(var(--color-popover) / <alpha-value>)',
                    foreground: 'hsl(var(--color-popover-foreground) / <alpha-value>)',
                },

                // Primary colors
                primary: {
                    DEFAULT: 'hsl(var(--color-primary) / <alpha-value>)',
                    foreground: 'hsl(var(--color-primary-foreground) / <alpha-value>)',
                },

                // Secondary colors
                secondary: {
                    DEFAULT: 'hsl(var(--color-secondary) / <alpha-value>)',
                    foreground: 'hsl(var(--color-secondary-foreground) / <alpha-value>)',
                },

                // Muted colors
                muted: {
                    DEFAULT: 'hsl(var(--color-muted) / <alpha-value>)',
                    foreground: 'hsl(var(--color-muted-foreground) / <alpha-value>)',
                },

                // Accent colors
                accent: {
                    DEFAULT: 'hsl(var(--color-accent) / <alpha-value>)',
                    foreground: 'hsl(var(--color-accent-foreground) / <alpha-value>)',
                },

                // Destructive colors
                destructive: {
                    DEFAULT: 'hsl(var(--color-destructive) / <alpha-value>)',
                    foreground: 'hsl(var(--color-primary-foreground) / <alpha-value>)',
                },

                // Border and input colors
                border: 'hsl(var(--color-border) / <alpha-value>)',
                input: 'hsl(var(--color-input) / <alpha-value>)',
                ring: 'hsl(var(--color-ring) / <alpha-value>)',

                // Chart colors
                chart: {
                    1: 'hsl(var(--color-chart-1) / <alpha-value>)',
                    2: 'hsl(var(--color-chart-2) / <alpha-value>)',
                    3: 'hsl(var(--color-chart-3) / <alpha-value>)',
                    4: 'hsl(var(--color-chart-4) / <alpha-value>)',
                    5: 'hsl(var(--color-chart-5) / <alpha-value>)',
                },

                // Sidebar colors
                sidebar: {
                    DEFAULT: 'hsl(var(--color-sidebar) / <alpha-value>)',
                    foreground: 'hsl(var(--color-sidebar-foreground) / <alpha-value>)',
                    primary: 'hsl(var(--color-sidebar-primary) / <alpha-value>)',
                    'primary-foreground': 'hsl(var(--color-sidebar-primary-foreground) / <alpha-value>)',
                    accent: 'hsl(var(--color-sidebar-accent) / <alpha-value>)',
                    'accent-foreground': 'hsl(var(--color-sidebar-accent-foreground) / <alpha-value>)',
                    border: 'hsl(var(--color-sidebar-border) / <alpha-value>)',
                    ring: 'hsl(var(--color-sidebar-ring) / <alpha-value>)',
                },
            },

            borderRadius: {
                'sm': 'calc(var(--radius-sm))',
                'md': 'calc(var(--radius-md))',
                'lg': 'calc(var(--radius-lg))',
                'xl': 'calc(var(--radius-xl))',
            },

            fontFamily: {
                sans: [
                    'Inter',
                    'ui-sans-serif',
                    'system-ui',
                    'sans-serif',
                    'Apple Color Emoji',
                    'Segoe UI Emoji',
                    'Segoe UI Symbol',
                    'Noto Color Emoji',
                ],
                mono: [
                    'ui-monospace',
                    'SFMono-Regular',
                    'Monaco',
                    'Consolas',
                    'Liberation Mono',
                    'Courier New',
                    'monospace',
                ],
            },

            fontSize: {
                'xs': ['0.75rem', { lineHeight: '1rem' }],
                'sm': ['0.875rem', { lineHeight: '1.25rem' }],
                'base': ['1rem', { lineHeight: '1.5rem' }],
                'lg': ['1.125rem', { lineHeight: '1.75rem' }],
                'xl': ['1.25rem', { lineHeight: '1.75rem' }],
                '2xl': ['1.5rem', { lineHeight: '2rem' }],
                '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
                '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
                '5xl': ['3rem', { lineHeight: '1' }],
                '6xl': ['3.75rem', { lineHeight: '1' }],
            },

            spacing: {
                '18': '4.5rem',
                '88': '22rem',
                '128': '32rem',
            },

            minHeight: {
                '12': '3rem',
                '16': '4rem',
                '20': '5rem',
            },

            maxWidth: {
                '8xl': '88rem',
                '9xl': '96rem',
            },

            animation: {
                'fade-in': 'fadeIn 0.3s ease-in-out',
                'slide-in-from-left': 'slideInFromLeft 0.3s ease-in-out',
                'slide-in-from-right': 'slideInFromRight 0.3s ease-in-out',
                'slide-in-from-bottom': 'slideInFromBottom 0.3s ease-in-out',
                'slide-in-from-top': 'slideInFromTop 0.3s ease-in-out',
                'bounce-in': 'bounceIn 0.6s ease-in-out',
                'pulse-subtle': 'pulseSubtle 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'spin-slow': 'spin 3s linear infinite',
            },

            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideInFromLeft: {
                    '0%': { transform: 'translateX(-100%)', opacity: '0' },
                    '100%': { transform: 'translateX(0)', opacity: '1' },
                },
                slideInFromRight: {
                    '0%': { transform: 'translateX(100%)', opacity: '0' },
                    '100%': { transform: 'translateX(0)', opacity: '1' },
                },
                slideInFromBottom: {
                    '0%': { transform: 'translateY(100%)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                slideInFromTop: {
                    '0%': { transform: 'translateY(-100%)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                bounceIn: {
                    '0%': { transform: 'scale(0.3)', opacity: '0' },
                    '50%': { transform: 'scale(1.05)', opacity: '1' },
                    '70%': { transform: 'scale(0.9)' },
                    '100%': { transform: 'scale(1)' },
                },
                pulseSubtle: {
                    '0%, 100%': { opacity: '1' },
                    '50%': { opacity: '0.8' },
                },
            },

            backdropBlur: {
                'xs': '2px',
            },

            boxShadow: {
                'soft': '0 2px 8px -2px rgba(0, 0, 0, 0.1), 0 4px 16px -4px rgba(0, 0, 0, 0.1)',
                'medium': '0 4px 16px -4px rgba(0, 0, 0, 0.1), 0 8px 32px -8px rgba(0, 0, 0, 0.1)',
                'strong': '0 8px 32px -8px rgba(0, 0, 0, 0.15), 0 16px 64px -16px rgba(0, 0, 0, 0.15)',
                'inner-soft': 'inset 0 1px 3px 0 rgba(0, 0, 0, 0.1)',
            },

            ringWidth: {
                '3': '3px',
            },

            transitionDuration: {
                '250': '250ms',
                '400': '400ms',
            },

            transitionTimingFunction: {
                'bounce-in': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
                'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
            },

            zIndex: {
                '60': '60',
                '70': '70',
                '80': '80',
                '90': '90',
                '100': '100',
            },

            screens: {
                'xs': '475px',
                '3xl': '1920px',
            },

            gridTemplateColumns: {
                'auto-fit-240': 'repeat(auto-fit, minmax(240px, 1fr))',
                'auto-fit-280': 'repeat(auto-fit, minmax(280px, 1fr))',
                'auto-fit-320': 'repeat(auto-fit, minmax(320px, 1fr))',
            },

            aspectRatio: {
                '4/3': '4 / 3',
                '3/2': '3 / 2',
                '2/3': '2 / 3',
                '9/16': '9 / 16',
            },
        },
    },
    plugins: [
        // Plugin for custom utilities
        function({ addUtilities, addComponents, theme }) {
            // RTL utilities
            addUtilities({
                '.rtl-flip': {
                    '[dir="rtl"] &': {
                        transform: 'scaleX(-1)',
                    },
                },
                '.rtl-rotate-180': {
                    '[dir="rtl"] &': {
                        transform: 'rotate(180deg)',
                    },
                },
            });

            // Logical properties utilities
            addUtilities({
                '.ms-auto': {
                    'margin-inline-start': 'auto',
                },
                '.me-auto': {
                    'margin-inline-end': 'auto',
                },
                '.ps-4': {
                    'padding-inline-start': theme('spacing.4'),
                },
                '.pe-4': {
                    'padding-inline-end': theme('spacing.4'),
                },
                '.ps-6': {
                    'padding-inline-start': theme('spacing.6'),
                },
                '.pe-6': {
                    'padding-inline-end': theme('spacing.6'),
                },
                '.border-s': {
                    'border-inline-start-width': '1px',
                },
                '.border-e': {
                    'border-inline-end-width': '1px',
                },
                '.start-0': {
                    'inset-inline-start': '0',
                },
                '.end-0': {
                    'inset-inline-end': '0',
                },
                '.start-4': {
                    'inset-inline-start': theme('spacing.4'),
                },
                '.end-4': {
                    'inset-inline-end': theme('spacing.4'),
                },
                '.text-start': {
                    'text-align': 'start',
                },
                '.text-end': {
                    'text-align': 'end',
                },
            });

            // Custom scroll utilities
            addUtilities({
                '.scrollbar-thin': {
                    'scrollbar-width': 'thin',
                    '&::-webkit-scrollbar': {
                        width: '6px',
                        height: '6px',
                    },
                },
                '.scrollbar-none': {
                    'scrollbar-width': 'none',
                    '&::-webkit-scrollbar': {
                        display: 'none',
                    },
                },
                '.scrollbar-track-transparent': {
                    '&::-webkit-scrollbar-track': {
                        'background-color': 'transparent',
                    },
                },
                '.scrollbar-thumb-muted': {
                    '&::-webkit-scrollbar-thumb': {
                        'background-color': theme('colors.muted.DEFAULT'),
                        'border-radius': theme('borderRadius.full'),
                    },
                    '&::-webkit-scrollbar-thumb:hover': {
                        'background-color': theme('colors.muted.foreground'),
                    },
                },
            });
        },

        // Plugin for container queries support
        function({ addVariant }) {
            addVariant('container-xs', '@container (min-width: 480px)');
            addVariant('container-sm', '@container (min-width: 640px)');
            addVariant('container-md', '@container (min-width: 768px)');
            addVariant('container-lg', '@container (min-width: 1024px)');
            addVariant('container-xl', '@container (min-width: 1280px)');
        },

        // Plugin for data attribute variants
        function({ addVariant }) {
            addVariant('data-open', '&[data-state="open"]');
            addVariant('data-closed', '&[data-state="closed"]');
            addVariant('data-loading', '&[data-loading="true"]');
            addVariant('data-error', '&[data-error="true"]');
            addVariant('data-success', '&[data-success="true"]');
        },

        // Plugin for group hover variants
        function({ addVariant }) {
            addVariant('group-hover-focus', '.group:hover &:focus');
            addVariant('group-focus-hover', '.group:focus &:hover');
        },
    ],

    // Safelist classes that might be generated dynamically
    safelist: [
        'text-chart-1',
        'text-chart-2',
        'text-chart-3',
        'text-chart-4',
        'text-chart-5',
        'bg-chart-1',
        'bg-chart-2',
        'bg-chart-3',
        'bg-chart-4',
        'bg-chart-5',
        'status-success',
        'status-warning',
        'status-error',
        'status-info',
        'rtl-only',
        'ltr-only',
    ],

    // Future flags for upcoming Tailwind CSS features
    future: {
        hoverOnlyWhenSupported: true,
    },

    // Experimental features
    experimental: {
        optimizeUniversalDefaults: true,
    },
};