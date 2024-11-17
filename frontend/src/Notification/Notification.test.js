import { render, screen, fireEvent } from '@testing-library/react';
import Notification from './Notification';
import React from 'react';

describe('Notification component', () => {
  test('renders the bell icon', () => {
    render(<Notification />);
    
    // Check if the bell icon is in the document
    const bellIcon = screen.getByTestId('notification-bell');
    expect(bellIcon).toBeInTheDocument();
  });

  test('displays notification badge with the correct count', () => {
    render(<Notification />);
    
    // Check if the badge shows the number of notifications
    const notificationBadge = screen.getByText(/5/); // It should show 5 because of the initial state
    expect(notificationBadge).toBeInTheDocument();
  });

  test('opens and closes the notification dropdown when the bell icon is clicked', () => {
    render(<Notification />);
    
    // Initially, the dropdown should not be visible
    const dropdown = screen.queryByTestId('notification-dropdown');
    expect(dropdown).not.toBeInTheDocument();
    
    // Click the bell to open the dropdown
    const bellIcon = screen.getByTestId('notification-bell');
    fireEvent.click(bellIcon);
    
    // After clicking, the dropdown should be visible
    const openedDropdown = screen.getByTestId('notification-dropdown');
    expect(openedDropdown).toBeInTheDocument();
    
    // Click the bell again to close the dropdown
    fireEvent.click(bellIcon);
    
    // After clicking again, the dropdown should be hidden
    const closedDropdown = screen.queryByTestId('notification-dropdown');
    expect(closedDropdown).not.toBeInTheDocument();
  });

  test('dismisses a notification when the dismiss button is clicked', () => {
    render(<Notification />);
    
    // Open the dropdown
    const bellIcon = screen.getByTestId('notification-bell');
    fireEvent.click(bellIcon);
    
    // Get all dismiss buttons (they all have the text 'x')
    const dismissButtons = screen.getAllByText('x');
    
    // Click the first dismiss button
    fireEvent.click(dismissButtons[0]);
  
    // After clicking, the notification should be removed
    expect(screen.queryByText('Yay Team Monkeys :)')).not.toBeInTheDocument();
  });
  

  test('shows "No new notifications" when there are no notifications', () => {
    render(<Notification />);
    
    // Set notifications to an empty array by modifying the state
    fireEvent.click(screen.getByTestId('notification-bell'));
    
    // Clear all notifications
    const dismissButtons = screen.getAllByText('x');
    dismissButtons.forEach((button) => fireEvent.click(button));
    
    // After clearing, check for the "No new notifications" message
    const noNotificationsMessage = screen.getByText('No new notifications');
    expect(noNotificationsMessage).toBeInTheDocument();
  });
});
