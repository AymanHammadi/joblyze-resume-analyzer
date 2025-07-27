# AI Resume Analyzer

A modern web application that analyzes resumes using AI to provide detailed feedback and suggestions for improvement. Built with React Router v7 and powered by Puter.com's cloud infrastructure.

## 🌟 Features

- **AI-Powered Analysis**: Upload your resume and get comprehensive feedback on:
  - ATS (Applicant Tracking System) compatibility
  - Tone and style
  - Content quality
  - Document structure
  - Skills assessment
- **Multi-language Support**: Available in English and Arabic
- **Job-Specific Analysis**: Tailor analysis based on specific job titles and descriptions
- **Cloud Storage**: Secure file storage and user authentication via Puter.com
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Real-time Processing**: Get instant feedback with animated loading states

## 🚀 Tech Stack

- **Frontend**: React 19, React Router v7, TypeScript
- **Styling**: Tailwind CSS, Shadcn UI components
- **State Management**: Zustand
- **Backend & AI**: Puter.com cloud services
- **Internationalization**: i18next
- **File Processing**: PDF.js for document handling

## 🏗️ Project Structure

```
app/
├── components/         # Reusable UI components
│   ├── ui/            # Base UI components (buttons, cards, etc.)
│   ├── analysis/      # Resume analysis components
│   ├── upload/        # File upload components
│   └── home/          # Home page components
├── routes/            # Page routes
├── lib/               # Utilities and services
│   └── puter.ts       # Puter.com integration
├── constants/         # App constants and AI prompts
├── locales/           # Translation files (en/ar)
├── hooks/             # Custom React hooks
└── types/             # TypeScript type definitions
```

## 🔧 Getting Started

### Prerequisites

- Node.js  
- A Puter.com account (free at [puter.com](https://puter.com))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/AymanHammadi/joblyze-resume-analyzer.git
   cd ai-resume-analyzer
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
npm start
```

## 🔑 Authentication & Setup

### Using Puter.com

This application uses **Puter.com** for all backend services including:
- User authentication
- File storage
- AI processing
- Key-value data storage

### How to Login

1. **Visit the app** and click "Sign In"
2. **Create a Puter account** at [puter.com](https://puter.com) if you don't have one
3. **Sign in** using the Puter authentication flow
4. **Start analyzing** your resumes immediately

### No Backend Required

The beauty of this project is that **all backend functionality is provided by Puter.com**:
- ✅ No server setup needed
- ✅ No database configuration
- ✅ No AI API keys to manage


## 🤖 Customizing AI Prompts

The AI analysis prompts can be customized in `app/constants/index.ts`:

### Main Analysis Function

```typescript
export const prepareInstructions = ({
  jobTitle,
  jobDescription,
  AIResponseFormat,
  language = 'en',
}) => {
  // Modify this base prompt to change analysis behavior
  const basePrompt = `You are an expert in ATS and resume analysis...`;
  
  // Add your custom instructions here
}
```

### Response Format

The AI response structure is defined in `AIResponseFormat`:

```typescript
export const AIResponseFormat = `
interface Feedback {
  overallScore: number; // max 100
  ATS: {
    score: number;
    tips: { type: "good" | "improve"; tip: string; }[];
  };
  // ... other sections
}`;
```

### Customization Examples

1. **Add new analysis categories**:
   ```typescript
   // Add to AIResponseFormat
   keywords: {
     score: number;
     tips: { type: "good" | "improve"; tip: string; }[];
   };
   ```

2. **Modify scoring criteria**:
   ```typescript
   const basePrompt = `Focus heavily on technical skills for ${jobTitle} positions...`;
   ```

3. **Change language support**:
   ```typescript
   // Add new language in prepareInstructions function
   const isFrench = language === 'fr';
   const responseLanguage = isFrench ? 'French' : 'English';
   ```

## 🌍 Internationalization

### Adding New Languages

1. **Create translation files**:
   ```
   app/locales/[lang]/
   ├── app.json
   ├── auth.json
   ├── upload.json
   └── analysis.json
   ```

2. **Update the i18n configuration** in `app/i18n.ts`

3. **Modify AI prompts** in `constants/index.ts` to support the new language

### Current Languages

- 🇺🇸 English (`en`)
- 🇸🇦 Arabic (`ar`) - Full RTL support

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run typecheck` - Run TypeScript type checking

## 📄 License

This project is open source and available under the [MIT License](LICENSE).


## 🙏 Acknowledgments

- **Adrian Hajdin** ([adrianhajdin](https://github.com/adrianhajdin)) for the original AI Resume Analyzer concept and inspiration from his [ai-resume-analyzer](https://github.com/adrianhajdin/ai-resume-analyzer) project
- **Puter.com** for providing the complete backend infrastructure
- **React Router** team for the excellent v7 framework
- **Shadcn UI** for the beautiful component primitives
- **Tailwind CSS** for the utility-first styling approach
