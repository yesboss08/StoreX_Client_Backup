import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { ThemeToggle } from '../ThemeToggle'
import { ThemeProvider } from '../../../contexts/ThemeContext'

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
}
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
})

describe('ThemeToggle', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    document.documentElement.className = ''
  })

  it('should render theme toggle button', () => {
    localStorageMock.getItem.mockReturnValue('light')
    
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    )

    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
    expect(button).toHaveAttribute('aria-label', 'Switch to dark mode')
  })

  it('should show correct icon for light theme', () => {
    localStorageMock.getItem.mockReturnValue('light')
    
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    )

    const button = screen.getByRole('button')
    expect(button).toHaveAttribute('aria-pressed', 'false')
  })

  it('should show correct icon for dark theme', () => {
    localStorageMock.getItem.mockReturnValue('dark')
    
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    )

    const button = screen.getByRole('button')
    expect(button).toHaveAttribute('aria-pressed', 'true')
    expect(button).toHaveAttribute('aria-label', 'Switch to light mode')
  })

  it('should toggle theme when clicked', () => {
    localStorageMock.getItem.mockReturnValue('light')
    
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    )

    const button = screen.getByRole('button')
    
    // Initially light theme
    expect(button).toHaveAttribute('aria-pressed', 'false')
    
    // Click to toggle to dark
    fireEvent.click(button)
    expect(button).toHaveAttribute('aria-pressed', 'true')
    expect(localStorageMock.setItem).toHaveBeenCalledWith('theme', 'dark')
  })

  it('should render different sizes', () => {
    localStorageMock.getItem.mockReturnValue('light')
    
    const { rerender } = render(
      <ThemeProvider>
        <ThemeToggle size="sm" />
      </ThemeProvider>
    )
    
    expect(screen.getByRole('button')).toHaveClass('w-8', 'h-8')

    rerender(
      <ThemeProvider>
        <ThemeToggle size="lg" />
      </ThemeProvider>
    )
    
    expect(screen.getByRole('button')).toHaveClass('w-12', 'h-12')
  })
})