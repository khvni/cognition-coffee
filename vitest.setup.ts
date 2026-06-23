import "@testing-library/jest-dom"

// jsdom lacks pointer capture API
HTMLElement.prototype.setPointerCapture = () => {}
HTMLElement.prototype.releasePointerCapture = () => {}
HTMLElement.prototype.hasPointerCapture = () => false
