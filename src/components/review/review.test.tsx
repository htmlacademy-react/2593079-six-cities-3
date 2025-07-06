import { render, screen } from '@testing-library/react';
import Review from './review';
import { Review as ReviewType } from '../../types';

describe('Review component', () => {
  const mockReview: ReviewType = {
    id: '1',
    comment: 'Great place!',
    rating: 4,
    date: '2023-01-01T00:00:00.000Z',
    user: {
      name: 'John Doe',
      avatarUrl: 'path/to/avatar.jpg',
      isPro: false
    },
  };

  it('should render user avatar with correct src', () => {
    render(<Review review={mockReview} />);

    const avatarImage = screen.getByAltText('Reviews avatar');
    expect(avatarImage).toBeInTheDocument();
    expect(avatarImage).toHaveAttribute('src', mockReview.user.avatarUrl);
    expect(avatarImage).toHaveAttribute('width', '54');
    expect(avatarImage).toHaveAttribute('height', '54');
  });

  it('should render all review data correctly', () => {
    render(<Review review={mockReview} />);

    expect(screen.getByText(mockReview.user.name)).toBeInTheDocument();
    expect(screen.getByText(mockReview.comment)).toBeInTheDocument();
    expect(screen.getByText(/Rating/i)).toBeInTheDocument();
  });
});
