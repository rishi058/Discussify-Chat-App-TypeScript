import { forwardRef, ComponentProps } from "react";
import * as Switch from "@radix-ui/react-switch";

type RootProps = ComponentProps<typeof Switch.Root>;

export const Root = forwardRef<HTMLButtonElement, RootProps>(function Root(
  props,
  ref
) {
  return (
    <Switch.Root
      className={`w-[40px] h-[22px] rounded-full bg-gray-200 ring-1 ring-gray-300 dark:bg-gray-800 dark:ring-gray-700 outline-none ${
        props.className ?? ""
      }`}
      {...props}
      ref={ref}
    />
  );
});

type ThumbProps = ComponentProps<typeof Switch.Thumb>;

export const Thumb = forwardRef<HTMLSpanElement, ThumbProps>(function Thumb(
  props,
  ref
) {
  return (
    <Switch.Thumb
      className={`flex items-center justify-center w-[20px] h-[20px] bg-white dark:bg-gray-950 text-gray-600 dark:text-gray-300 shadow rounded-full transition-transform translate-x-px data-[state=checked]:translate-x-[19px] ${
        props.className || ""
      }`}
      {...props}
      ref={ref}
    />
  );
});