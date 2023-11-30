import { configure } from 'mobx';
import '@testing-library/jest-dom/extend-expect';

// Mock window.matchMedia
// https://jestjs.io/docs/en/manual-mocks#mocking-methods-which-are-not-implemented-in-jsdom
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

window.URL.createObjectURL = jest.fn(() => 'details');
window.open = jest.fn();

HTMLCanvasElement.prototype.getContext = () => jest.fn() as any;

// mock animations so they happen immediately
jest.mock('framer-motion', () => {
  const AnimatePresence = ({ children }) => children;
  const useAnimation = () => undefined;
  const motion = (el) => el;
  motion.div = (el) => el;
  motion.img = (el) => el;
  return {
    AnimatePresence,
    motion,
    useAnimation,
  };
});

// Mock current date
(Date.now as any) = jest.fn(() => new Date(1590433200000));

// Disable MobX strict mode warnings
configure({
  enforceActions: 'never',
});

window.mappedin = {} as any;

window.HTMLElement.prototype.scrollIntoView = jest.fn();

export {};
