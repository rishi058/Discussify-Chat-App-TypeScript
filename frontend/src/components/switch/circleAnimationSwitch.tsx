import { useState, useEffect, useRef } from "react";
import { flushSync } from "react-dom";
import * as Switch from "./SwitchComponent";
import { IconMoon, IconSun } from "./Icons";

export default function CircleAnimationSwitch() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const toggleDarkMode = async (isDarkMode: boolean) => {
    if (
      !ref.current ||
      !document.startViewTransition ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setIsDarkMode(isDarkMode);
      return;
    }

    await document.startViewTransition(() => {
      flushSync(() => {
        setIsDarkMode(isDarkMode);
      });
    }).ready;

    const { top, left, width, height } = ref.current!.getBoundingClientRect();
    const x = left + width / 2;
    const y = top + height / 2;
    const right = window.innerWidth - left;
    const bottom = window.innerHeight - top;
    const maxRadius = Math.hypot(Math.max(left, right), Math.max(top, bottom));

    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${maxRadius}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration: 500,
        easing: "ease-in-out",
        pseudoElement: "::view-transition-new(root)",
      }
    );
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <Switch.Root checked={isDarkMode} onCheckedChange={toggleDarkMode}>
      <Switch.Thumb ref={ref}>
        {isDarkMode ? <IconMoon /> : <IconSun />}
      </Switch.Thumb>
    </Switch.Root>
  );
}
