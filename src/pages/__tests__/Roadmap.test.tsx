import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '../../contexts/ThemeContext';
import { Roadmap } from '../Roadmap';

// Helper to render with required providers
const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      <ThemeProvider>{component}</ThemeProvider>
    </BrowserRouter>
  );
};

describe('Roadmap Page - Navigation Elements', () => {
  it('should render top navigation button to return to home', () => {
    renderWithProviders(<Roadmap />);
    
    // Check for the top "Back to Home" button
    const topNavButtons = screen.getAllByText('Back to Home');
    expect(topNavButtons.length).toBeGreaterThan(0);
    
    // Verify it's a link pointing to home
    const topLink = topNavButtons[0].closest('a');
    expect(topLink).toHaveAttribute('href', '/');
  });

  it('should render bottom navigation button to explore current features', () => {
    renderWithProviders(<Roadmap />);
    
    // Check for the bottom "Explore Current Features" button
    const bottomButton = screen.getByText('Explore Current Features');
    expect(bottomButton).toBeInTheDocument();
    
    // Verify it's a link pointing to home
    const bottomLink = bottomButton.closest('a');
    expect(bottomLink).toHaveAttribute('href', '/');
  });

  it('should render page header', () => {
    renderWithProviders(<Roadmap />);
    
    const heading = screen.getByText('Features Roadmap');
    expect(heading).toBeInTheDocument();
  });

  it('should render all 9 feature cards', () => {
    renderWithProviders(<Roadmap />);
    
    // Check for specific feature titles
    expect(screen.getByText('Cloud Platform Integration')).toBeInTheDocument();
    expect(screen.getByText('Cost-Effective Storage')).toBeInTheDocument();
    expect(screen.getByText('Premium S3 Storage')).toBeInTheDocument();
    expect(screen.getByText('Device Access Tiers')).toBeInTheDocument();
    expect(screen.getByText('Advanced File Versioning')).toBeInTheDocument();
    expect(screen.getByText('Team Workspaces')).toBeInTheDocument();
    expect(screen.getByText('AI-Powered Search')).toBeInTheDocument();
    expect(screen.getByText('Automated Backups')).toBeInTheDocument();
    expect(screen.getByText('File Preview & Editing')).toBeInTheDocument();
  });

  it('should have visually prominent navigation elements', () => {
    renderWithProviders(<Roadmap />);
    
    // Check that navigation buttons exist and are rendered as buttons (not just text links)
    const topNavButtons = screen.getAllByText('Back to Home');
    const topButton = topNavButtons[0].closest('button');
    expect(topButton).toBeInTheDocument();
    
    const bottomButton = screen.getByText('Explore Current Features').closest('button');
    expect(bottomButton).toBeInTheDocument();
  });
});
