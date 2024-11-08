// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import React from 'react';
import axios from 'axios';

jest.mock('axios', () => ({
  get: jest.fn().mockResolvedValue({ data: 'mocked data' }), // Mocking axios GET request
}));
