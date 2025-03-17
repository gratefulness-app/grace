import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import { getCookie, setCookie, isTooBigForCookie } from '../utils/cookie';

// Define the types of elements that can be added to a card
export type ElementType = 'text' | 'image' | 'shape';

// Base interface for all card elements
export interface BaseElement {
  id: string;
  type: ElementType;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  zIndex: number;
}

// Text element specific properties
export interface TextElement extends BaseElement {
  type: 'text';
  text: string;
  fontSize: number;
  fontFamily: string;
  color: string;
  bold: boolean;
  italic: boolean;
  underline: boolean;
  alignment: 'left' | 'center' | 'right';
}

// Image element specific properties
export interface ImageElement extends BaseElement {
  type: 'image';
  src: string;
  alt: string;
}

// Shape element specific properties
export interface ShapeElement extends BaseElement {
  type: 'shape';
  shape: 'rectangle' | 'circle' | 'triangle';
  backgroundColor: string;
  borderColor: string;
  borderWidth: number;
}

// Union type for all possible card elements
export type CardElement = TextElement | ImageElement | ShapeElement;

// Card data structure (for saving and loading)
export interface CardData {
  id: string;
  title: string;
  backgroundColor: string;
  elements: CardElement[];
  createdAt: string;
  updatedAt: string;
  views: number;
}

// Card state interface
export interface CardState {
  // Current working card
  id: string;
  title: string;
  backgroundColor: string;
  elements: CardElement[];
  selectedElementId: string | null;

  // Saved cards
  savedCards: CardData[];

  // Card actions
  setTitle: (title: string) => void;
  setBackgroundColor: (color: string) => void;
  addElement: (element: Omit<CardElement, 'id'>) => string;
  updateElement: (id: string, updates: Partial<Omit<CardElement, 'id' | 'type'>>) => void;
  removeElement: (id: string) => void;
  selectElement: (id: string | null) => void;
  moveElement: (id: string, x: number, y: number) => void;
  resizeElement: (id: string, width: number, height: number) => void;
  rotateElement: (id: string, rotation: number) => void;
  bringElementToFront: (id: string) => void;
  sendElementToBack: (id: string) => void;

  // Card management
  createNewCard: () => void;
  saveCard: () => string;
  loadCard: (cardId: string) => void;
  loadAllCards: () => void;
  deleteCard: (cardId: string) => void;
  incrementViews: (cardId: string) => void;
}

// Cookie name for saved cards
const SAVED_CARDS_COOKIE = 'grace_saved_cards';

// Default values for new text elements
const defaultTextElement: Omit<TextElement, 'id'> = {
  type: 'text',
  text: 'Click to edit text',
  x: 100,
  y: 100,
  width: 200,
  height: 50,
  rotation: 0,
  zIndex: 1,
  fontSize: 16,
  fontFamily: 'Arial',
  color: '#000000',
  bold: false,
  italic: false,
  underline: false,
  alignment: 'center',
};

// Create a new empty card
const createEmptyCard = (): Pick<CardState, 'id' | 'title' | 'backgroundColor' | 'elements' | 'selectedElementId'> => ({
  id: uuidv4(),
  title: 'Untitled Card',
  backgroundColor: '#FFB6C1', // Light pink
  elements: [],
  selectedElementId: null,
});

// Load saved cards from cookies
const loadSavedCardsFromCookies = (): CardData[] => {
  if (typeof window === 'undefined') return [];

  try {
    const savedCardsJson = getCookie(SAVED_CARDS_COOKIE);
    return savedCardsJson ? JSON.parse(savedCardsJson) : [];
  } catch (error) {
    console.error('Error loading saved cards:', error);
    return [];
  }
};

// Save cards to cookies
const saveCardsToCookies = (cards: CardData[]) => {
  if (typeof window === 'undefined') return;

  try {
    const savedCardsJson = JSON.stringify(cards);
    if (isTooBigForCookie(savedCardsJson)) {
      console.warn('Saved cards data exceeds cookie size limits. Some cards may not be saved.');
      // In a real app, we'd use local storage, IndexedDB, or a backend
    }
    setCookie(SAVED_CARDS_COOKIE, savedCardsJson);
  } catch (error) {
    console.error('Error saving cards:', error);
  }
};

// Create the Zustand store
export const useCardStore = create<CardState>((set, get) => ({
  ...createEmptyCard(),
  savedCards: [],

  // Set the card title
  setTitle: (title) => set({ title }),

  // Set the card background color
  setBackgroundColor: (backgroundColor) => set({ backgroundColor }),

  // Add a new element to the card
  addElement: (element: Omit<CardElement, 'id'>) => {
    const id = uuidv4();
    set((state) => ({
      elements: [...state.elements, { ...element, id } as CardElement],
      selectedElementId: id, // Auto-select the new element
    }));
    return id;
  },

  // Update an existing element
  updateElement: (id: string, updates: Partial<Omit<CardElement, 'id' | 'type'>>) => {
    set((state) => ({
      elements: state.elements.map((element) =>
        element.id === id
          ? { ...element, ...updates }
          : element
      ),
    }));
  },

  // Remove an element
  removeElement: (id) =>
    set((state) => ({
      elements: state.elements.filter((element) => element.id !== id),
      selectedElementId: state.selectedElementId === id ? null : state.selectedElementId,
    })),

  // Select an element
  selectElement: (id) => set({ selectedElementId: id }),

  // Move an element
  moveElement: (id, x, y) =>
    set((state) => ({
      elements: state.elements.map((element) =>
        element.id === id ? { ...element, x, y } : element
      ),
    })),

  // Resize an element
  resizeElement: (id, width, height) =>
    set((state) => ({
      elements: state.elements.map((element) =>
        element.id === id ? { ...element, width, height } : element
      ),
    })),

  // Rotate an element
  rotateElement: (id, rotation) =>
    set((state) => ({
      elements: state.elements.map((element) =>
        element.id === id ? { ...element, rotation } : element
      ),
    })),

  // Bring an element to the front (increase z-index)
  bringElementToFront: (id) =>
    set((state) => {
      const maxZIndex = Math.max(...state.elements.map((el) => el.zIndex), 0);
      return {
        elements: state.elements.map((element) =>
          element.id === id ? { ...element, zIndex: maxZIndex + 1 } : element
        ),
      };
    }),

  // Send an element to the back (decrease z-index)
  sendElementToBack: (id) =>
    set((state) => {
      const minZIndex = Math.min(...state.elements.map((el) => el.zIndex), 0);
      return {
        elements: state.elements.map((element) =>
          element.id === id ? { ...element, zIndex: minZIndex - 1 } : element
        ),
      };
    }),

  // Create a new card
  createNewCard: () => {
    set(createEmptyCard());
  },

  // Save the current card
  saveCard: () => {
    const state = get();
    const now = new Date().toISOString();

    // Create the card data object
    const cardData: CardData = {
      id: state.id,
      title: state.title,
      backgroundColor: state.backgroundColor,
      elements: state.elements,
      createdAt: now,
      updatedAt: now,
      views: 0
    };

    // Get existing cards and update or add this one
    const existingCards = get().savedCards;
    const existingCardIndex = existingCards.findIndex(c => c.id === cardData.id);

    let updatedCards: CardData[];
    if (existingCardIndex >= 0) {
      // Update existing card (preserve creation date and views)
      updatedCards = existingCards.map((card, index) => {
        if (index === existingCardIndex) {
          return {
            ...cardData,
            createdAt: card.createdAt,
            views: card.views,
          };
        }
        return card;
      });
    } else {
      // Add new card
      updatedCards = [...existingCards, cardData];
    }

    // Update the store
    set({ savedCards: updatedCards });

    // Save to cookies
    saveCardsToCookies(updatedCards);

    return cardData.id;
  },

  // Load a card into the editor
  loadCard: (cardId) => {
    const savedCards = get().savedCards;
    const cardToLoad = savedCards.find(c => c.id === cardId);

    if (cardToLoad) {
      set({
        id: cardToLoad.id,
        title: cardToLoad.title,
        backgroundColor: cardToLoad.backgroundColor,
        elements: cardToLoad.elements,
        selectedElementId: null
      });
    }
  },

  // Load all saved cards from cookies
  loadAllCards: () => {
    const savedCards = loadSavedCardsFromCookies();
    set({ savedCards });
  },

  // Delete a card
  deleteCard: (cardId) => {
    const state = get();
    const updatedCards = state.savedCards.filter(c => c.id !== cardId);

    set({ savedCards: updatedCards });
    saveCardsToCookies(updatedCards);

    // If we're currently editing the deleted card, create a new one
    if (state.id === cardId) {
      set(createEmptyCard());
    }
  },

  // Increment view count for a card
  incrementViews: (cardId) => {
    const state = get();
    const updatedCards = state.savedCards.map(card => {
      if (card.id === cardId) {
        return {
          ...card,
          views: card.views + 1
        };
      }
      return card;
    });

    set({ savedCards: updatedCards });
    saveCardsToCookies(updatedCards);
  }
}));

// Helper function to create a new text element with default values
export const createTextElement = (overrides: Partial<Omit<TextElement, 'id'>> = {}): Omit<TextElement, 'id'> => ({
  ...defaultTextElement,
  ...overrides,
  zIndex: Math.max(...useCardStore.getState().elements.map(el => el.zIndex), 0) + 1
});

// Helper function to create a new image element
export const createImageElement = (src: string, overrides: Partial<Omit<ImageElement, 'id' | 'type' | 'src'>> = {}): Omit<ImageElement, 'id'> => ({
  type: 'image',
  src,
  alt: 'Image',
  x: 100,
  y: 100,
  width: 200,
  height: 200,
  rotation: 0,
  zIndex: Math.max(...useCardStore.getState().elements.map(el => el.zIndex), 0) + 1,
  ...overrides,
});

// Helper function to create a new shape element
export const createShapeElement = (shape: 'rectangle' | 'circle' | 'triangle', overrides: Partial<Omit<ShapeElement, 'id' | 'type' | 'shape'>> = {}): Omit<ShapeElement, 'id'> => ({
  type: 'shape',
  shape,
  x: 100,
  y: 100,
  width: 100,
  height: 100,
  rotation: 0,
  zIndex: Math.max(...useCardStore.getState().elements.map(el => el.zIndex), 0) + 1,
  backgroundColor: '#FFFFFF',
  borderColor: '#000000',
  borderWidth: 1,
  ...overrides,
});

// Initialize store by loading saved cards
if (typeof window !== 'undefined') {
  // On client-side only
  useCardStore.getState().loadAllCards();
}