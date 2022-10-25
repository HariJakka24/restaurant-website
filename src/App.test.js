import { render, screen } from '@testing-library/react';
import App from './App';
import Footer from './components/footer/Footer';
import PaymentPage from './components/PaymentPage/PaymentPage';

test('renders social media heading in footer', () => {
  render(<Footer />);
  const linkElement = screen.getByText(/our social media links:/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders about link', () => {
  render(<Footer />);
  const linkElement = screen.getByText(/about:/i);
  expect(linkElement).toBeInTheDocument();
});
test('renders email link', () => {
  render(<Footer />);
  const linkElement = screen.getByText(/hari@gmail.com/i);
  expect(linkElement).toBeInTheDocument();
});
test('renders email link', () => {
  render(<Footer />);
  const linkElement = screen.getByText(/harijakka24@gmail.com/i);
  expect(linkElement).toBeInTheDocument();
});
test('renders information heading', () => {
  render(<Footer />);
  const linkElement = screen.getByText(/information/i);
  expect(linkElement).toBeInTheDocument();
});
test('renders whatsapp link heading', () => {
  render(<Footer />);
  const linkElement = screen.getByText(/Chat in Watsapp:/i);
  expect(linkElement).toBeInTheDocument();
});
