# Cloud Storage Platform

A modern, feature-rich cloud storage platform built with React, TypeScript, and Vite. Securely store, manage, and access your files from anywhere with an intuitive interface and powerful features.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
  - [Current Features](#current-features)
  - [Planned Features](#planned-features)
- [Cloud Storage Dashboard Demo](#cloud-storage-dashboard-demo)
  - [Demo Features](#demo-features)
  - [Running the Demo](#running-the-demo)
  - [API Endpoints](#api-endpoints)
  - [Demo Mode](#demo-mode)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Development](#development)
  - [Available Scripts](#available-scripts)
  - [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Overview

This cloud storage platform provides a comprehensive solution for managing your digital files in the cloud. Built with modern web technologies, it offers a seamless experience across devices with support for file uploads, folder management, subscription plans, and more. The platform emphasizes user experience with features like dark mode support, responsive design, and intuitive navigation.

Whether you're an individual looking to backup personal files or a team needing collaborative storage solutions, this platform provides the tools and flexibility to meet your needs. The application is built with scalability and performance in mind, utilizing React 18's latest features and a robust state management system.

## Features

### Current Features

- **Authentication & Authorization**: Secure user authentication with email/password and Google OAuth integration
- **File Upload & Download**: Upload files of various types and download them securely
- **Folder Management**: Create, organize, and manage folders to keep your files structured
- **Subscription Plans**: Multiple subscription tiers with different storage limits and features
- **Dark Mode Support**: Toggle between light and dark themes for comfortable viewing
- **Responsive Design**: Optimized for mobile, tablet, and desktop devices
- **User Dashboard**: Comprehensive dashboard to manage files, storage, and account settings
- **Storage Analytics**: Visual representation of storage usage and available space
- **Profile Management**: Update user profile information and preferences
- **Admin Panel**: Administrative interface for managing users and subscriptions

### Planned Features

Explore our exciting roadmap of upcoming features at [/roadmap](/roadmap), including:
- Cloud platform integrations (OneDrive, Google Drive, Dropbox)
- Multiple storage tier options (cost-effective and premium S3)
- Device access tiers based on subscription plans
- Advanced file versioning with unlimited history
- Team workspaces for collaboration
- AI-powered search capabilities
- Automated backup scheduling
- In-browser file preview and editing

## Cloud Storage Dashboard Demo

A pixel-accurate, responsive cloud storage dashboard demo showcasing a modern UI for managing files across multiple cloud providers (Google Drive, OneDrive, Dropbox).

### Demo Features

- **Multi-Provider Storage View**: Display storage usage across Google Drive, OneDrive, and Dropbox
- **Light/Dark Theme**: Seamless theme switching with smooth transitions and localStorage persistence
- **Responsive Design**: Optimized layouts for mobile (<768px), tablet (768-1023px), and desktop (≥1024px)
- **Storage Analytics**: Visual breakdown of storage by category (Images, Documents, Videos, etc.)
- **Folder Management**: Display folders with member avatars and file counts
- **Recent Files Table**: Sortable table with file type icons, sizes, and relative timestamps
- **Demo Mode Fallback**: Graceful fallback to mock data when API is unavailable
- **Accessibility**: WCAG 2.1 AA compliant with keyboard navigation and ARIA labels

### Running the Demo

1. **Set the API base URL** (optional)
   
   If you have a backend API, set the `VITE_API_BASE_URL` in your `.env` file:
   ```env
   VITE_API_BASE_URL=http://localhost:4000/api
   ```
   
   If not set, the demo will default to `/api` and automatically fall back to mock data.

2. **Start the development server**
   ```bash
   npm run dev
   ```

3. **Navigate to the dashboard**
   
   Open your browser and go to the cloud storage dashboard route (implementation-specific).

### API Endpoints

The dashboard expects the following API endpoints:

| Endpoint | Method | Description | Response |
|----------|--------|-------------|----------|
| `{base}/storage` | GET | Get storage information for all providers | `{ storage: { google: {...}, onedrive: {...}, dropbox: {...}, totals: {...} } }` |
| `{base}/folders` | GET | Get list of folders | `{ folders: [...] }` |
| `{base}/files` | GET | Get list of files | `{ files: [...], total: number, hasMore: boolean }` |
| `{base}/user` | GET | Get user profile and stats | `{ user: {...}, stats: {...} }` |

**Query Parameters for `/files`:**
- `limit` (default: 50) - Number of files to return
- `sort` (default: modified_desc) - Sort order

### Demo Mode

When the API is unavailable (401, 403, or network error), the dashboard automatically switches to **Demo Mode**:

- A visible banner displays "Demo mode" at the top of the dashboard
- All data is loaded from mock JSON files
- Full functionality is preserved for demonstration purposes
- No authentication required

**Mock Data Location:** `src/mocks/cloud-storage-dashboard/demo-data.json`

The mock data includes:
- Storage information for 3 providers (Google Drive, OneDrive, Dropbox)
- 5+ folders with metadata and member avatars
- 10+ files with various types, sizes, and timestamps
- User profile with quota statistics
- Category breakdown (Images, Documents, Videos, Audios, Archive, Others)

## Tech Stack

### Frontend Framework
- **React** 18.3.1 - Modern UI library with hooks and concurrent features
- **TypeScript** 5.6.2 - Type-safe JavaScript for better developer experience
- **Vite** 6.0.5 - Next-generation frontend build tool for fast development

### Routing & State Management
- **React Router** 7.6.0 - Declarative routing for React applications
- **Redux Toolkit** 2.8.2 - Efficient state management with Redux
- **Redux Persist** 6.0.0 - Persist and rehydrate Redux store

### Styling & UI
- **Tailwind CSS** 3.4.17 - Utility-first CSS framework
- **Material Tailwind** 2.1.10 - Material Design components for React
- **Heroicons** 2.2.0 - Beautiful hand-crafted SVG icons
- **Lucide React** 0.552.0 - Additional icon library
- **Class Variance Authority** 0.7.1 - CSS class composition utility

### Testing
- **Vitest** 4.0.15 - Fast unit test framework powered by Vite
- **Testing Library** 16.3.0 - React component testing utilities
- **@fast-check/vitest** - Property-based testing for comprehensive coverage
- **Happy DOM** 20.0.11 - Lightweight DOM implementation for testing

### Additional Libraries
- **Axios** - Promise-based HTTP client for API requests
- **React Hot Toast** 2.5.2 - Toast notifications
- **Day.js** 1.11.13 - Date manipulation library
- **React OAuth Google** 0.12.2 - Google authentication integration
- **MIME** 4.0.7 - MIME type detection

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** >= 18.0.0
- **npm** >= 8.0.0

You can verify your installations by running:
```bash
node --version
npm --version
```

## Installation

Follow these steps to set up the project locally:

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd client
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory and configure the required environment variables (see [Environment Variables](#environment-variables) section).

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to `http://localhost:5173` (or the port shown in your terminal)

## Development

### Available Scripts

The following npm scripts are available for development and production:

- **`npm run dev`** - Start the Vite development server with hot module replacement (HMR)
- **`npm run build`** - Build the application for production (includes TypeScript compilation)
- **`npm run lint`** - Run ESLint to check code quality and style
- **`npm run preview`** - Preview the production build locally
- **`npm run test`** - Run tests in watch mode
- **`npm run test:run`** - Run tests once and exit
- **`npm run test:ui`** - Open Vitest UI for interactive test debugging

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# API Configuration
VITE_API_BASE_URL=<your-api-base-url>

# Google OAuth
VITE_GOOGLE_CLIENT_ID=<your-google-client-id>

# Razorpay (Payment Gateway)
VITE_RAZORPAY_KEY_ID=<your-razorpay-key-id>

# Other configuration variables as needed
```

**Note**: All environment variables must be prefixed with `VITE_` to be accessible in the application.

## Project Structure

```
client/
├── .kiro/                      # Kiro specifications and documentation
│   └── specs/
│       ├── features-roadmap-page/
│       └── cloud-storage-dashboard/
├── public/                     # Static assets
├── src/
│   ├── assets/                 # Images, fonts, and other assets
│   │   └── cloud-storage-dashboard/
│   │       └── icons/          # Provider and file type icons
│   ├── component/              # Legacy components (being migrated)
│   │   ├── FileCard_UI/
│   │   ├── AdminUserFileAccess.tsx
│   │   ├── AllPlan.tsx
│   │   ├── Dashboard.tsx
│   │   ├── Login.tsx
│   │   └── ...
│   ├── components/             # Modern component architecture
│   │   ├── cloud-storage-dashboard/  # Dashboard demo components
│   │   ├── dashboard/          # Dashboard-specific components
│   │   ├── landing/            # Landing page components
│   │   ├── layout/             # Layout components (Header, Footer, etc.)
│   │   ├── roadmap/            # Roadmap page components
│   │   └── ui/                 # Reusable UI components
│   ├── constant/               # Application constants
│   ├── contexts/               # React contexts (Theme, Auth, etc.)
│   ├── hooks/                  # Custom React hooks
│   │   └── cloud-storage-dashboard/  # Dashboard-specific hooks
│   ├── mocks/                  # Mock data for demos
│   │   └── cloud-storage-dashboard/  # Dashboard mock data
│   ├── pages/                  # Page components
│   │   ├── cloud-storage-dashboard/  # Dashboard demo pages
│   │   ├── Landing.tsx
│   │   ├── Roadmap.tsx
│   │   ├── PrivacyPolicy.tsx
│   │   └── TermsOfService.tsx
│   ├── services/               # API services
│   │   └── cloud-storage-dashboard/  # Dashboard API service
│   ├── store/                  # Redux store configuration
│   │   ├── authSlice.ts
│   │   ├── hooks.ts
│   │   └── store.ts
│   ├── styles/                 # Global styles and design tokens
│   ├── test/                   # Test configuration and utilities
│   ├── utils/                  # Utility functions
│   ├── App.tsx                 # Root application component
│   ├── main.tsx                # Application entry point
│   └── index.css               # Global CSS
├── .env                        # Environment variables (not in git)
├── package.json                # Project dependencies and scripts
├── tsconfig.json               # TypeScript configuration
├── vite.config.ts              # Vite configuration
├── tailwind.config.js          # Tailwind CSS configuration
└── README.md                   # This file
```

## Testing

This project uses **Vitest** as the testing framework, providing fast and efficient unit testing, along with **@fast-check/vitest** for property-based testing.

### Running Tests

```bash
# Run tests in watch mode (recommended during development)
npm run test

# Run tests once and exit (useful for CI/CD)
npm run test:run

# Open Vitest UI for interactive testing
npm run test:ui

# Run tests with coverage reporting
npm run test:run -- --coverage
```

### Test Types

#### Unit Tests
Unit tests verify specific examples, edge cases, and user interactions:
- Component rendering with various props
- User interactions (clicks, keyboard navigation)
- Edge cases (empty data, missing fields)
- Error conditions (API failures, invalid input)

#### Property-Based Tests
Property-based tests verify universal properties hold across all inputs:
- Data transformation correctness (file size formatting, date formatting)
- Calculation accuracy (storage percentages, totals)
- Consistency guarantees (theme persistence, color assignment)
- API error handling behavior

Property tests use `@fast-check/vitest` with a minimum of 100 iterations per test.

### Writing Tests

Tests are co-located with their source files using the `.test.tsx` or `.test.ts` suffix:

```
src/
├── components/
│   ├── ui/
│   │   ├── Button.tsx
│   │   └── __tests__/
│   │       └── Button.test.tsx
```

Example unit test:

```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Button } from '../Button';

describe('Button', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });
});
```

Example property-based test:

```typescript
import { test, expect } from 'vitest';
import fc from 'fast-check';
import { formatFileSize } from '../fileUtils';

test('formatFileSize produces accurate output for any byte value', () => {
  fc.assert(
    fc.property(
      fc.nat({ max: 1e15 }),
      (bytes) => {
        const formatted = formatFileSize(bytes);
        expect(formatted).toMatch(/^\d+\.\d{2}\s+(B|KB|MB|GB|TB)$/);
      }
    ),
    { numRuns: 100 }
  );
});
```

### Test Coverage

Run tests with coverage reporting:

```bash
npm run test:run -- --coverage
```

**Coverage Goals:**
- Unit test coverage: Minimum 80% line coverage
- Property test coverage: All correctness properties implemented
- Integration test coverage: All major user flows

## Deployment

### Building for Production

1. **Create a production build**
   ```bash
   npm run build
   ```

   This command:
   - Compiles TypeScript code
   - Bundles and optimizes assets
   - Outputs to the `dist/` directory

2. **Preview the production build locally**
   ```bash
   npm run preview
   ```

### Deployment Platforms

This application can be deployed to various platforms:

#### Vercel
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

#### Netlify
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod
```

#### Traditional Hosting
Upload the contents of the `dist/` directory to your web server.

### Environment Configuration

Ensure all environment variables are properly configured in your deployment platform:
- Set `VITE_API_BASE_URL` to your production API endpoint
- Configure `VITE_GOOGLE_CLIENT_ID` for OAuth
- Set `VITE_RAZORPAY_KEY_ID` for payment processing

## Contributing

We welcome contributions to improve the cloud storage platform! Here's how you can help:

### Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally
   ```bash
   git clone <your-fork-url>
   cd client
   ```
3. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

### Development Guidelines

- **Code Style**: Follow the existing code style and ESLint rules
- **TypeScript**: Use TypeScript for all new code with proper type definitions
- **Components**: Create reusable components in the `src/components/` directory
- **Testing**: Write tests for new features and bug fixes
- **Commits**: Write clear, descriptive commit messages

### Submitting Changes

1. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add new feature description"
   ```

2. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

3. **Create a Pull Request** on GitHub with:
   - Clear description of changes
   - Reference to any related issues
   - Screenshots for UI changes

### Code Review Process

- All submissions require review before merging
- Address any feedback from reviewers
- Ensure all tests pass and there are no linting errors

## License

This project is licensed under the MIT License. See the LICENSE file for details.

---

**Built with ❤️ using React, TypeScript, and Vite**
