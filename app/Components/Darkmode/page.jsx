import React from "react";
import { Switch } from "@nextui-org/react";
import { MoonIcon } from "./MoonIcon";
import { SunIcon } from "./SunIcon";
import { useTheme } from "next-themes";

export default function App() {
  const { theme, setTheme } = useTheme();

  return (
    <Switch
      defaultSelected={theme === "dark"}
      size="sm"
      color="secondary"
      thumbIcon={({ isSelected, className }) =>
        isSelected ? (
          <SunIcon className={className} />
        ) : (
          <MoonIcon className={className} />
        )
      }
      onChange={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      Dark mode
    </Switch>
  );
}
