'use client';

import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { FaPalette } from 'react-icons/fa';
import { useColorTheme } from '@/context/ThemeContext';
import type { Theme } from '@/context/ThemeContext';

const themes: Theme[] = ['default', 'rose', 'green', 'blue', 'purple', 'orange', 'teal', 'mono', 'scaled'];

export const ColorThemeSwitcher = () => {
  const { colorTheme, setColorTheme } = useColorTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <FaPalette />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {themes.map((t) => (
          <DropdownMenuItem key={t} onClick={() => setColorTheme(t)}>
            {t.charAt(0).toUpperCase() + t.slice(1)}
            {colorTheme === t && " ✓"}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};