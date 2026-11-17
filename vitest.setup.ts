import "@testing-library/jest-dom/vitest"

// jsdom lacks pointer capture API
HTMLElement.prototype.setPointerCapture = () => {}
HTMLElement.prototype.releasePointerCapture = () => {}
HTMLElement.prototype.hasPointerCapture = () => false
