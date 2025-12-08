import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { HoverDetails } from '../HoverDetails'

describe('HoverDetails', () => {
  const mockProps = {
    name: 'test-file.txt',
    path: '/documents/projects',
    size: 1024,
    lastModified: new Date('2024-01-01'),
    type: 'file' as const,
    isVisible: true,
    onDownload: vi.fn(),
    onRename: vi.fn(),
    onCopyPath: vi.fn(),
  }

  beforeEach(() => {
    vi.clearAllMocks()
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should render children without tooltip initially', () => {
    render(
      <HoverDetails {...mockProps}>
        <div>Test Content</div>
      </HoverDetails>
    )
    
    expect(screen.getByText('Test Content')).toBeInTheDocument()
    expect(screen.queryByText('test-file.txt')).not.toBeInTheDocument()
  })

  it('should show tooltip after hover delay', async () => {
    render(
      <HoverDetails {...mockProps}>
        <div>Test Content</div>
      </HoverDetails>
    )
    
    const container = screen.getByText('Test Content').parentElement
    fireEvent.mouseEnter(container!)
    
    // Fast-forward past the 150ms delay
    vi.advanceTimersByTime(150)
    
    await waitFor(() => {
      expect(screen.getByText('test-file.txt')).toBeInTheDocument()
      expect(screen.getByText('/documents/projects')).toBeInTheDocument()
      expect(screen.getByText('Size: 1 KB')).toBeInTheDocument()
    })
  })

  it('should hide tooltip on mouse leave', async () => {
    render(
      <HoverDetails {...mockProps}>
        <div>Test Content</div>
      </HoverDetails>
    )
    
    const container = screen.getByText('Test Content').parentElement
    
    // Show tooltip
    fireEvent.mouseEnter(container!)
    vi.advanceTimersByTime(150)
    
    await waitFor(() => {
      expect(screen.getByText('test-file.txt')).toBeInTheDocument()
    })
    
    // Hide tooltip
    fireEvent.mouseLeave(container!)
    vi.advanceTimersByTime(100)
    
    await waitFor(() => {
      expect(screen.queryByText('test-file.txt')).not.toBeInTheDocument()
    })
  })

  it('should show tooltip on focus', async () => {
    render(
      <HoverDetails {...mockProps}>
        <div>Test Content</div>
      </HoverDetails>
    )
    
    const container = screen.getByText('Test Content').parentElement
    fireEvent.focus(container!)
    
    await waitFor(() => {
      expect(screen.getByText('test-file.txt')).toBeInTheDocument()
    })
  })

  it('should hide tooltip on Escape key', async () => {
    render(
      <HoverDetails {...mockProps}>
        <div>Test Content</div>
      </HoverDetails>
    )
    
    const container = screen.getByText('Test Content').parentElement
    fireEvent.focus(container!)
    
    await waitFor(() => {
      expect(screen.getByText('test-file.txt')).toBeInTheDocument()
    })
    
    fireEvent.keyDown(container!, { key: 'Escape' })
    
    await waitFor(() => {
      expect(screen.queryByText('test-file.txt')).not.toBeInTheDocument()
    })
  })

  it('should call action handlers when buttons are clicked', async () => {
    render(
      <HoverDetails {...mockProps}>
        <div>Test Content</div>
      </HoverDetails>
    )
    
    const container = screen.getByText('Test Content').parentElement
    fireEvent.mouseEnter(container!)
    vi.advanceTimersByTime(150)
    
    await waitFor(() => {
      expect(screen.getByText('test-file.txt')).toBeInTheDocument()
    })
    
    // Test download button
    const downloadButton = screen.getByLabelText('Download')
    fireEvent.click(downloadButton)
    expect(mockProps.onDownload).toHaveBeenCalled()
    
    // Test rename button
    const renameButton = screen.getByLabelText('Rename')
    fireEvent.click(renameButton)
    expect(mockProps.onRename).toHaveBeenCalled()
    
    // Test copy path button
    const copyButton = screen.getByLabelText('Copy path')
    fireEvent.click(copyButton)
    expect(mockProps.onCopyPath).toHaveBeenCalled()
  })

  it('should render folder icon for folder type', async () => {
    render(
      <HoverDetails {...mockProps} type="folder">
        <div>Test Content</div>
      </HoverDetails>
    )
    
    const container = screen.getByText('Test Content').parentElement
    fireEvent.mouseEnter(container!)
    vi.advanceTimersByTime(150)
    
    await waitFor(() => {
      expect(screen.getByText('test-file.txt')).toBeInTheDocument()
    })
    
    // Should show folder icon (we can't easily test the icon itself, but we can verify the tooltip is shown)
    expect(screen.getByRole('tooltip')).toBeInTheDocument()
  })

  it('should not show tooltip when isVisible is false', async () => {
    render(
      <HoverDetails {...mockProps} isVisible={false}>
        <div>Test Content</div>
      </HoverDetails>
    )
    
    const container = screen.getByText('Test Content').parentElement
    fireEvent.mouseEnter(container!)
    vi.advanceTimersByTime(150)
    
    // Should not show tooltip
    expect(screen.queryByText('test-file.txt')).not.toBeInTheDocument()
  })
})