import { useDarkMode } from '@/contexts/dark-mode-context';
import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';

function DarkModeToggle() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <Button size="icon" variant="outline" onClick={() => toggleDarkMode()}>
      {isDarkMode ? <Moon /> : <Sun />}
    </Button>
  );
}

export default DarkModeToggle;
