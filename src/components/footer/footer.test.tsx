import { render, screen } from '@testing-library/react';
import Footer from './footer';

describe('Component: Footer', () => {

  it('should render correctly', () => {
    render(<Footer/>);
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });


});
