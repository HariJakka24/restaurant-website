import React from "react";
import {fireEvent, render, screen} from '@testing-library/react';
import Steps from "./Steps";

test('renders learn react link', () => {
    render(<Steps />);
    const linkElement = screen.getByText(/works/i);
    expect(linkElement).toBeInTheDocument();
  });

  test('renders favourites heading in steps', () => {
    render(<Steps />);
    const linkElement = screen.getByText(/choose your favorite food/i);
    expect(linkElement).toBeInTheDocument();
  });
  test('renders payments step heading', () => {
    render(<Steps />);
    const linkElement = screen.getByText(/easy payments methods/i);
    expect(linkElement).toBeInTheDocument();
  });