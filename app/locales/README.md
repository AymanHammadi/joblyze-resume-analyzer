# Internationalization (i18n) Setup

This project uses i18next for internationalization with the following features:

- Language detection
- Dynamic language switching
- RTL support for Arabic
- Translation of page titles and meta descriptions
- Component-level translations

## Folder Structure

```
app/
├── locales/           # Contains all translation files
│   ├── en/            # English translations
│   │   └── translation.json
│   ├── ar/            # Arabic translations
│   │   └── translation.json
│   └── README.md      # This file
├── i18n.ts            # i18next configuration
├── styles/
│   └── rtl.css        # RTL-specific styles
└── components/
    └── LanguageSwitcher.tsx  # Component to switch languages
```

## Usage

### Basic Translation

```tsx
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const { t } = useTranslation();
  
  return <h1>{t('app.title')}</h1>;
}
```

### Changing Language

```tsx
import { changeLanguage } from '../i18n';

// Change to Arabic
changeLanguage('ar');

// Change to English
changeLanguage('en');
```

### Dynamic Meta Tags

```tsx
import i18n from '../i18n';

export function meta() {
  const title = i18n.t('app.title');
  const description = i18n.t('app.description');
  
  return [
    { title },
    { name: "description", content: description }
  ];
}
```

## Adding a New Language

1. Create a new folder in `app/locales/` with the language code (e.g., `fr/`)
2. Add a `translation.json` file with the same structure as the existing ones
3. Update the `i18n.ts` file to include the new language:

```ts
// Import the new translation
import frTranslation from './locales/fr/translation.json';

// Add it to the resources
resources: {
  en: {
    translation: enTranslation
  },
  ar: {
    translation: arTranslation
  },
  fr: {
    translation: frTranslation
  }
}
```

4. Add a button to the `LanguageSwitcher` component for the new language