import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { RoadmapFeatureCard } from '../RoadmapFeatureCard';
import { CloudArrowUpIcon } from '@heroicons/react/24/outline';

describe('RoadmapFeatureCard', () => {
  it('should render with all required props', () => {
    render(
      <RoadmapFeatureCard
        icon={<CloudArrowUpIcon className="h-8 w-8" data-testid="test-icon" />}
        title="Test Feature"
        description="This is a test description"
        status="coming-soon"
      />
    );

    expect(screen.getByText('Test Feature')).toBeInTheDocument();
    expect(screen.getByText('This is a test description')).toBeInTheDocument();
    expect(screen.getByText('Coming Soon')).toBeInTheDocument();
    expect(screen.getByTestId('test-icon')).toBeInTheDocument();
  });

  it('should display correct status badge for coming-soon', () => {
    render(
      <RoadmapFeatureCard
        icon={<CloudArrowUpIcon className="h-8 w-8" />}
        title="Test Feature"
        description="Test description"
        status="coming-soon"
      />
    );

    const badge = screen.getByText('Coming Soon');
    expect(badge).toHaveClass('bg-blue-100');
  });

  it('should display correct status badge for planned', () => {
    render(
      <RoadmapFeatureCard
        icon={<CloudArrowUpIcon className="h-8 w-8" />}
        title="Test Feature"
        description="Test description"
        status="planned"
      />
    );

    const badge = screen.getByText('Planned');
    expect(badge).toHaveClass('bg-purple-100');
  });

  it('should display correct status badge for in-progress', () => {
    render(
      <RoadmapFeatureCard
        icon={<CloudArrowUpIcon className="h-8 w-8" />}
        title="Test Feature"
        description="Test description"
        status="in-progress"
      />
    );

    const badge = screen.getByText('In Progress');
    expect(badge).toHaveClass('bg-green-100');
  });

  it('should display category when provided', () => {
    render(
      <RoadmapFeatureCard
        icon={<CloudArrowUpIcon className="h-8 w-8" />}
        title="Test Feature"
        description="Test description"
        status="coming-soon"
        category="Storage"
      />
    );

    expect(screen.getByText('Storage')).toBeInTheDocument();
  });

  it('should not display category when not provided', () => {
    render(
      <RoadmapFeatureCard
        icon={<CloudArrowUpIcon className="h-8 w-8" />}
        title="Test Feature"
        description="Test description"
        status="coming-soon"
      />
    );

    expect(screen.queryByText('Storage')).not.toBeInTheDocument();
  });

  it('should apply hover effect classes', () => {
    const { container } = render(
      <RoadmapFeatureCard
        icon={<CloudArrowUpIcon className="h-8 w-8" />}
        title="Test Feature"
        description="Test description"
        status="coming-soon"
      />
    );

    const card = container.querySelector('.group');
    expect(card).toHaveClass('hover:scale-105');
    expect(card).toHaveClass('transition-all');
  });
});
