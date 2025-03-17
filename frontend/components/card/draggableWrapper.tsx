"use client";

import React, { forwardRef, useRef } from 'react';
import Draggable, { DraggableProps, DraggableBounds } from 'react-draggable';

// Define the props interface
interface DraggableWrapperProps {
  children: React.ReactNode;
  position: { x: number; y: number };
  onDrag: (e: React.MouseEvent | React.TouchEvent | MouseEvent | TouchEvent, data: { x: number; y: number }) => void;
  onStop: (e: React.MouseEvent | React.TouchEvent | MouseEvent | TouchEvent, data: { x: number; y: number }) => void;
  disabled?: boolean;
  bounds?: DraggableBounds | string | false;
  axis?: 'both' | 'x' | 'y' | 'none';
  defaultClassName?: string;
  defaultClassNameDragging?: string;
  defaultClassNameDragged?: string;
}

const DraggableWrapper = forwardRef<HTMLDivElement, DraggableWrapperProps>(
  (props, forwardedRef) => {
    const {
      children,
      // Filter out props that aren't needed by Draggable
      defaultClassName,
      defaultClassNameDragging,
      defaultClassNameDragged,
      ...draggableProps
    } = props;

    // Create a local ref that we'll merge with the forwarded ref
    // Important: This must be specifically typed as React.RefObject<HTMLElement>
    // to match what Draggable expects for nodeRef
    const nodeRef = useRef<HTMLElement>(null) as React.RefObject<HTMLElement>;

    // Combine both refs
    const setRefs = (element: HTMLDivElement | null) => {
      // Update local ref (with type assertion to make TypeScript happy)
      (nodeRef as React.MutableRefObject<HTMLDivElement | null>).current = element;

      // Forward to outer ref if it exists
      if (typeof forwardedRef === 'function') {
        forwardedRef(element);
      } else if (forwardedRef) {
        forwardedRef.current = element;
      }
    };

    // Use nodeRef to avoid findDOMNode deprecation warning
    return (
      <Draggable
        {...draggableProps}
        nodeRef={nodeRef}
      >
        <div ref={setRefs}>{children}</div>
      </Draggable>
    );
  }
);

DraggableWrapper.displayName = 'DraggableWrapper';

export default DraggableWrapper;