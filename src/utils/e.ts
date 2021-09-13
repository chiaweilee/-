export const onTouch = (opt = {}) => {
  // @ts-ignore
  const {
    longTouchTimeout,
    dblclickTimeout,
    onLongPress,
    onClick,
    onDblClick,
    style = {},
  } = {
    longTouchTimeout: 1000,
    dblclickTimeout: 200,
    ...opt,
  };
  let originEvent;
  let timeOutEvent: any = 0;
  let isLongTouch;
  let clickCount = 0;
  return {
    style: {
      ...style,
      touchAction: 'pan-y',
    },
    onContextMenu(e) {
      e.preventDefault();
    },
    onTouchStart(e) {
      isLongTouch = false;
      originEvent = e;
      timeOutEvent = setTimeout(function () {
        isLongTouch = true;
        if (typeof onLongPress === 'function') {
          onLongPress(originEvent);
        }
      }, longTouchTimeout);
      e.preventDefault();
    },
    onTouchMove(e) {
      const touch = e.touches[0];
      if (Math.abs(touch.clientY - originEvent.touches[0].touchY) < 10) {
        e.preventDefault();
      }
    },
    onTouchEnd() {
      if (timeOutEvent && !isLongTouch) {
        clearTimeout(timeOutEvent);
        timeOutEvent = 0;
        clickCount += 1;
        setTimeout(() => {
          if (clickCount === 1) {
            if (typeof onClick === 'function') {
              onClick(originEvent);
            }
          } else if (clickCount === 2) {
            if (typeof onDblClick === 'function') {
              onDblClick(originEvent);
            }
          }
          clickCount = 0;
        }, dblclickTimeout);
      }
      return false;
    },
  };
};
