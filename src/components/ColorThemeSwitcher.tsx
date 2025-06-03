'use client';

import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { FaCircle } from 'react-icons/fa';
import { useColorTheme } from '@/context/ThemeContext';
import type { Theme } from '@/context/ThemeContext';

const themes: Theme[] = ['default', 'imperial-red', 'persian-green', 'celtic-blue', 'light-mint', 'purple', 'orange', 'teal', 'raisin-black'];

function formatThemeName(theme: string) {
  return theme
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export const ColorThemeSwitcher = () => {
  const { colorTheme, setColorTheme } = useColorTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm"  >
          
          <FaCircle className='text-primary' />
          
            <span className={colorTheme === colorTheme ? 'text-primary' : ''}   >
               {formatThemeName(colorTheme)}
            </span>
          
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {themes.map((t) => (
          <DropdownMenuItem className={colorTheme === t ? 'text-primary' : ''} key={t} onClick={() => setColorTheme(t)}>
            {colorTheme === t && " ✓"}
            {formatThemeName(t)}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};