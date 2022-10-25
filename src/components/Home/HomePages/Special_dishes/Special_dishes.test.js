import React from "react";
import {fireEvent, render, screen} from '@testing-library/react';
import Special_dishes from "./Special_dishes";

test('renders speaciality dishes heading', () => {
    render(<Special_dishes />);
    const linkElement = screen.getByText(/speciality/i);
    expect(linkElement).toBeInTheDocument();
  });