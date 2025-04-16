import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('render COGNIZANT HEALTHCARE heading', () => {
  render(<App />);
  const headingElement = screen.getByText(/COGNIZANT HEALTHCARE/i);
  expect(headingElement).toBeInTheDocument();
});
test('renders login form', () => {
  render(<App />);
  const usernameLabel = screen.getByLabelText(/Username\/Email:/i);
  const passwordLabel = screen.getByLabelText(/Password:/i);
  const loginButton = screen.getByText(/Login/i);
  expect(usernameLabel).toBeInTheDocument();
  expect(passwordLabel).toBeInTheDocument();
  expect(loginButton).toBeInTheDocument();
});

test('renders sign up link', () => {
  render(<App />);
  const signUpLink = screen.getByText(/Sign up/i);
  expect(signUpLink).toBeInTheDocument();
});

test('renders menu icon', () => {
  render(<App />);
  const menuIcon = screen.getByRole('button');
  expect(menuIcon).toBeInTheDocument();
});

test('toggles sidebar menu', () => {
  render(<App />);
  const menuIcon = screen.getByRole('button');
  fireEvent.click(menuIcon);
  const sidebarMenu = screen.getByRole('navigation');
  expect(sidebarMenu).toHaveClass('active');
});