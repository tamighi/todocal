import { GestureResponderEvent, Pressable } from "react-native";

type Props = {
  children: React.ReactNode;
};

let collection: { ref: React.Ref<any>; cb: () => void }[] = [];

export const addClickOutsideListener = (
  ref: React.Ref<any>,
  cb: () => void,
) => {
  if (collection.find((c) => c.ref === ref)) return;
  collection.push({ ref, cb });
};

export const removeClickOutsideListener = (refToRemove: React.Ref<any>) => {
  collection = collection.filter(({ ref }) => ref !== refToRemove);
};

export const onTouch = (event: GestureResponderEvent) => {
  const { pageX, pageY } = event.nativeEvent;
  collection.forEach((item) => {
    // @ts-expect-error No idea why
    item.ref?.current?.measure(
      (
        _x: number,
        _y: number,
        width: number,
        height: number,
        x: number,
        y: number,
      ) => {
        if (pageX < x || pageX > x + width || pageY < y || pageY > y + height)
          item.cb();
      },
    );
  });
};

export const ClickOutsideProvider: React.FC<Props> = ({ children }) => {
  const handleTouch = (e: GestureResponderEvent) => {
    onTouch(e);
  };

  return (
    <Pressable onTouchStart={handleTouch} style={{ flex: 1 }}>
      {children}
    </Pressable>
  );
};
