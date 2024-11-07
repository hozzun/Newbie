const isTouchScreen =
  typeof window !== "undefined" && window.matchMedia("(hover: none) and (pointer: coarse)").matches;

interface registDragEventProps {
  onDragChange?: (deltaX: number, deltaY: number) => void;
  onDragEnd?: (deltaX: number, deltaY: number) => void;
  stopPropagation?: boolean;
}

export default function registDragEvent(props: registDragEventProps) {
  if (isTouchScreen) {
    return {
      onTouchStart: (touchEvent: React.TouchEvent<HTMLDivElement>) => {
        if (props.stopPropagation) touchEvent.stopPropagation();

        const touchMoveHandler = (moveEvent: TouchEvent) => {
          if (moveEvent.cancelable) moveEvent.preventDefault();

          const deltaX = moveEvent.touches[0].pageX - touchEvent.touches[0].pageX;
          const deltaY = moveEvent.touches[0].pageY - touchEvent.touches[0].pageY;
          props.onDragChange?.(deltaX, deltaY);
        };

        const touchEndHandler = (moveEvent: TouchEvent) => {
          const deltaX = moveEvent.touches[0].pageX - touchEvent.touches[0].pageX;
          const deltaY = moveEvent.touches[0].pageY - touchEvent.touches[0].pageY;
          props.onDragEnd?.(deltaX, deltaY);

          document.removeEventListener("touchmove", touchMoveHandler);
        };

        document.addEventListener("touchmove", touchMoveHandler, { passive: false });
        document.addEventListener("touchend", touchEndHandler, { once: true });
      },
    };
  }

  return {
    onMouseDown: (clickEvent: React.MouseEvent<Element, MouseEvent>) => {
      if (props.stopPropagation) clickEvent.stopPropagation();

      const mouseMoveHandler = (moveEvent: MouseEvent) => {
        const deltaX = moveEvent.pageX - clickEvent.pageX;
        const deltaY = moveEvent.pageY - clickEvent.pageY;
        props.onDragChange?.(deltaX, deltaY);
      };

      const mouseUpHandler = (moveEvent: MouseEvent) => {
        const deltaX = moveEvent.pageX - clickEvent.pageX;
        const deltaY = moveEvent.pageY - clickEvent.pageY;
        props.onDragEnd?.(deltaX, deltaY);

        document.removeEventListener("mousemove", mouseMoveHandler);
      };

      document.addEventListener("mousemove", mouseMoveHandler);
      document.addEventListener("mouseup", mouseUpHandler, { once: true });
    },
  };
}
