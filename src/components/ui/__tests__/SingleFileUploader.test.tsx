import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { SingleFileUploader } from '../SingleFileUploader'

// Mock XHR
const mockXHR = {
  open: vi.fn(),
  send: vi.fn(),
  abort: vi.fn(),
  setRequestHeader: vi.fn(),
  upload: {
    onprogress: null as any,
  },
  onload: null as any,
  onerror: null as any,
  onabort: null as any,
  withCredentials: false,
  status: 200,
  responseText: '{"message": "Upload successful"}',
}

// Mock XMLHttpRequest
Object.defineProperty(window, 'XMLHttpRequest', {
  writable: true,
  value: vi.fn(() => mockXHR),
})

describe('SingleFileUploader', () => {
  const mockProps = {
    uploadUrl: '/api/upload',
    onComplete: vi.fn(),
    onError: vi.fn(),
    onProgress: vi.fn(),
  }

  beforeEach(() => {
    vi.clearAllMocks()
    mockXHR.upload.onprogress = null
    mockXHR.onload = null
    mockXHR.onerror = null
    mockXHR.onabort = null
  })

  it('should render upload area when no file is selected', () => {
    render(<SingleFileUploader {...mockProps} />)
    
    expect(screen.getByText('Click to upload')).toBeInTheDocument()
    expect(screen.getByText('or drag and drop')).toBeInTheDocument()
  })

  it('should handle file selection', async () => {
    render(<SingleFileUploader {...mockProps} />)
    
    const file = new File(['test content'], 'test.txt', { type: 'text/plain' })
    const input = screen.getByRole('button').querySelector('input[type="file"]') as HTMLInputElement
    
    fireEvent.change(input, { target: { files: [file] } })
    
    await waitFor(() => {
      expect(screen.getByText('test.txt')).toBeInTheDocument()
      expect(screen.getByText('Start Upload')).toBeInTheDocument()
    })
  })

  it('should validate file size', () => {
    render(<SingleFileUploader {...mockProps} maxSize={1024} />)
    
    const largeFile = new File(['x'.repeat(2048)], 'large.txt', { type: 'text/plain' })
    const input = screen.getByRole('button').querySelector('input[type="file"]') as HTMLInputElement
    
    fireEvent.change(input, { target: { files: [largeFile] } })
    
    expect(screen.getByText(/File size exceeds/)).toBeInTheDocument()
  })

  it('should start upload and show progress', async () => {
    render(<SingleFileUploader {...mockProps} />)
    
    const file = new File(['test content'], 'test.txt', { type: 'text/plain' })
    const input = screen.getByRole('button').querySelector('input[type="file"]') as HTMLInputElement
    
    fireEvent.change(input, { target: { files: [file] } })
    
    await waitFor(() => {
      expect(screen.getByText('Start Upload')).toBeInTheDocument()
    })
    
    fireEvent.click(screen.getByText('Start Upload'))
    
    // Simulate XHR setup
    expect(mockXHR.open).toHaveBeenCalledWith('POST', '/api/upload')
    expect(mockXHR.send).toHaveBeenCalled()
    
    // Simulate progress
    const progressEvent = {
      lengthComputable: true,
      loaded: 50,
      total: 100,
    }
    
    if (mockXHR.upload.onprogress) {
      mockXHR.upload.onprogress(progressEvent)
    }
    
    await waitFor(() => {
      expect(screen.getByText(/Uploading — 50%/)).toBeInTheDocument()
    })
  })

  it('should handle upload success', async () => {
    render(<SingleFileUploader {...mockProps} />)
    
    const file = new File(['test content'], 'test.txt', { type: 'text/plain' })
    const input = screen.getByRole('button').querySelector('input[type="file"]') as HTMLInputElement
    
    fireEvent.change(input, { target: { files: [file] } })
    fireEvent.click(screen.getByText('Start Upload'))
    
    // Simulate successful upload
    if (mockXHR.onload) {
      mockXHR.onload()
    }
    
    await waitFor(() => {
      expect(mockProps.onComplete).toHaveBeenCalledWith({
        message: 'Upload successful'
      })
    })
  })

  it('should handle upload cancellation', async () => {
    render(<SingleFileUploader {...mockProps} />)
    
    const file = new File(['test content'], 'test.txt', { type: 'text/plain' })
    const input = screen.getByRole('button').querySelector('input[type="file"]') as HTMLInputElement
    
    fireEvent.change(input, { target: { files: [file] } })
    fireEvent.click(screen.getByText('Start Upload'))
    
    // Should show cancel button during upload
    await waitFor(() => {
      expect(screen.getByLabelText('Cancel upload')).toBeInTheDocument()
    })
    
    fireEvent.click(screen.getByLabelText('Cancel upload'))
    
    expect(mockXHR.abort).toHaveBeenCalled()
  })

  it('should show retry button after error', async () => {
    render(<SingleFileUploader {...mockProps} />)
    
    const file = new File(['test content'], 'test.txt', { type: 'text/plain' })
    const input = screen.getByRole('button').querySelector('input[type="file"]') as HTMLInputElement
    
    fireEvent.change(input, { target: { files: [file] } })
    fireEvent.click(screen.getByText('Start Upload'))
    
    // Simulate error
    if (mockXHR.onerror) {
      mockXHR.onerror()
    }
    
    await waitFor(() => {
      expect(screen.getByLabelText('Retry upload')).toBeInTheDocument()
    })
  })

  it('should be disabled when disabled prop is true', () => {
    render(<SingleFileUploader {...mockProps} disabled />)
    
    const uploadArea = screen.getByText('Click to upload').closest('div')
    expect(uploadArea).toHaveClass('opacity-50', 'cursor-not-allowed')
  })
})