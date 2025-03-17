import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';

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

// Card state interface
export interface CardState {
  title: string;
  backgroundColor: string;
  elements: CardElement[];
  selectedElementId: string | null;

  // Actions
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
}

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

// Create the Zustand store
export const useCardStore = create<CardState>((set) => ({
  title: 'Untitled Card',
  backgroundColor: '#FFB6C1', // Light pink
  elements: [],
  selectedElementId: null,

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