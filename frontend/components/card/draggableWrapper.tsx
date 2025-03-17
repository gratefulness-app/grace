"use client";

import React, { forwardRef, useRef, useEffect, useState } from 'react';
import Draggable, { DraggableBounds, DraggableData, DraggableEvent } from 'react-draggable';

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
      position,
      onDrag,
      onStop,
      defaultClassName = 'draggable',
      defaultClassNameDragging = 'dragging',
      defaultClassNameDragged = 'dragged',
      ...draggableProps
    } = props;

    // Create a local ref that we'll merge with the forwarded ref
    const nodeRef = useRef<HTMLElement>(null) as React.RefObject<HTMLElement>;

    // Let's try using a different approach - not using the controlled position
    // Instead, we'll use defaultPosition and track position changes internally
    const [lastPos, setLastPos] = useState(position);

    useEffect(() => {
      // Only update if the position from props changes significantly
      if (Math.abs(position.x - lastPos.x) > 1 || Math.abs(position.y - lastPos.y) > 1) {
        setLastPos(position);
      }
    }, [position, lastPos.x, lastPos.y]);

    // Handle drag events
    const handleDrag = (e: DraggableEvent, data: DraggableData) => {
      const { x, y } = data;
      console.log('Drag event:', { x, y, lastPos, nodePos: nodeRef.current?.getBoundingClientRect() });

      // Update the local position state during drag
      setLastPos({ x, y });

      // Then notify the parent component
      onDrag(e as React.MouseEvent | React.TouchEvent | MouseEvent | TouchEvent, { x, y });
    };

    // Handle drag stop events
    const handleStop = (e: DraggableEvent, data: DraggableData) => {
      const { x, y } = data;
      setLastPos({ x, y });
      onStop(e as React.MouseEvent | React.TouchEvent | MouseEvent | TouchEvent, { x, y });
    };

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
    // Use defaultPosition instead of position for uncontrolled component
    return (
      <Draggable
        {...draggableProps}
        defaultPosition={lastPos}
        onDrag={handleDrag}
        onStop={handleStop}
        nodeRef={nodeRef}
        defaultClassName={defaultClassName}
        defaultClassNameDragging={defaultClassNameDragging}
        defaultClassNameDragged={defaultClassNameDragged}
      >
        <div ref={setRefs}>{children}</div>
      </Draggable>
    );
  }
);

DraggableWrapper.displayName = 'DraggableWrapper';

export default DraggableWrapper;