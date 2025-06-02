// components/theme-toggle.tsx
'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';
import { ColorThemeSwitcher } from './ColorThemeSwitcher';

export function ThemeToggle() {
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { theme: _theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Ensure the component is mounted to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = resolvedTheme === 'dark';

  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  return (
    <>
      <ColorThemeSwitcher />
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleTheme}
        aria-label="Toggle theme"
      >
        {isDark ? (
          <Moon className="h-5 w-5 text-indigo-200" />
        ) : (
          <Sun className="h-5 w-5 text-yellow-500" />
        )}
      </Button>
    </>
  );
}
