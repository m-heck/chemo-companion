import React from 'react'; // import React for JSX
import { render, screen, fireEvent } from '@testing-library/react';
import CreateNotification from './CreateNotification';
import { MemoryRouter } from 'react-router-dom'; // wrap with MemoryRouter for navigation

describe('CreateNotification component', () => {
  // mock alert before each test
  beforeEach(() => {
    global.alert = jest.fn();
  });

  test('handles form submission', () => {
    // render the component wrapped in MemoryRouter to avoid the useNavigate error
    render(
      <MemoryRouter>
        <CreateNotification />
      </MemoryRouter>
    );

    // simulate typing in the notification message input field
    fireEvent.change(screen.getByLabelText(/Notification Message/i), {
      target: { value: 'Test notification message' },
    });

    // simulate form submission by targeting the button specifically
    const submitButton = screen.getByRole('button', { name: /Create Notification/i });
    fireEvent.click(submitButton);

    // check if the alert was called with the correct message
    expect(global.alert).toHaveBeenCalledWith('Notification created: Test notification message');
  });
});
