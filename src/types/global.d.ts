export {};

declare global {
  interface Window {
    __deckTick?: () => void;
  }
}
