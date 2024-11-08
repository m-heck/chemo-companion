import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import Chatbot from './Chatbot';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';

describe('Chatbot component', () => {
  // Reset the mock before each test
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  // Clean up mocks after each test to ensure no conflicts
  afterEach(() => {
    jest.resetAllMocks();
  });

  test('renders chatbot component', () => {
    render(
      <Router>
        <Chatbot />
      </Router>
    );
    
    // Check if the chatbot title is visible
    expect(screen.getByText(/chat with chemoCompanion/i)).toBeInTheDocument();
    
    // Ensure the message input field and send button are present
    expect(screen.getByPlaceholderText(/type your message here.../i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /send/i })).toBeInTheDocument();
  });

  test('sends message and displays user input', async () => {
    render(
      <Router>
        <Chatbot />
      </Router>
    );
    
    const input = screen.getByPlaceholderText(/type your message here.../i);
    const button = screen.getByRole('button', { name: /send/i });

    // Simulate typing a message in the input field
    fireEvent.change(input, { target: { value: 'Hello bot!' } });

    // Simulate clicking the send button and wait for the result
    await act(async () => {
      fireEvent.click(button);
    });

    // Check if the user’s message is displayed in the chat
    expect(screen.getByText('Hello bot!')).toBeInTheDocument();
  });

  test('handles bot response correctly', async () => {
    // Mock a successful API response from the bot
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ reply: 'Hello, user!' }),
    });

    render(
      <Router>
        <Chatbot />
      </Router>
    );

    const input = screen.getByPlaceholderText(/type your message here.../i);
    const button = screen.getByRole('button', { name: /send/i });

    // Simulate typing and sending a message
    fireEvent.change(input, { target: { value: 'Hello bot!' } });
    await act(async () => {
      fireEvent.click(button);
    });

    // Wait for the bot’s response to appear and check if it’s correct
    await waitFor(() => screen.getByText('Hello, user!'));
    expect(screen.getByText('Hello, user!')).toBeInTheDocument();
  });

  test('displays an error message when the API responds with an error', async () => {
    // Mock an API error response
    global.fetch.mockResolvedValueOnce({
      ok: false,
      statusText: 'Not Found',
    });

    render(
      <Router>
        <Chatbot />
      </Router>
    );

    const input = screen.getByPlaceholderText(/type your message here.../i);
    const button = screen.getByRole('button', { name: /send/i });

    // Type a message and simulate sending it
    fireEvent.change(input, { target: { value: 'Hello bot!' } });
    await act(async () => {
      fireEvent.click(button);
    });

    // Wait for the error message to appear and verify it
    await waitFor(() => screen.getByText('Error: Not Found'));
    expect(screen.getByText('Error: Not Found')).toBeInTheDocument();
  });

  test('handles network error correctly', async () => {
    // Mock a network error
    global.fetch.mockRejectedValueOnce(new Error('Network Error'));

    render(
      <Router>
        <Chatbot />
      </Router>
    );

    const input = screen.getByPlaceholderText(/type your message here.../i);
    const button = screen.getByRole('button', { name: /send/i });

    // Simulate typing and sending a message
    fireEvent.change(input, { target: { value: 'Hello bot!' } });
    await act(async () => {
      fireEvent.click(button);
    });

    // Wait for the network error message to appear and check if it's displayed
    await waitFor(() => screen.getByText('Error: Network Error'));
    expect(screen.getByText('Error: Network Error')).toBeInTheDocument();
  });
});
