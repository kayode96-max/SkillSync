"use client";
import React from "react";
import { Switch } from "@nextui-org/react";
import { MoonIcon } from "./MoonIcon";
import { SunIcon } from "./SunIcon";
import { useTheme } from "next-themes";

export default function TestDarkmode() {
  const { theme, setTheme } = useTheme();
  const [isDarkMode, setIsDarkMode] = React.useState(theme === "dark");

  React.useEffect(() => {
    setIsDarkMode(theme === "dark");
  }, [theme]);

  const handleChange = () => {
    const newTheme = isDarkMode ? "light" : "dark";
    setTheme(newTheme);
    setIsDarkMode(newTheme === "dark");
  };
  const switchLabel = isDarkMode ? "Light Mode" : "Dark Mode";
  return (
    <Switch
      checked={isDarkMode}
      size="sm"
      color="success"
      thumbIcon={({ isSelected, className }) =>
        isSelected ? (
          <SunIcon className={className} />
        ) : (
          <MoonIcon className={className} />
        )
      }
      onChange={handleChange}
    >
      {switchLabel}
    </Switch>
  );
}
