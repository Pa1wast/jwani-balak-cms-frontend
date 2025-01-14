import DarkModeToggle from './components/dark-mode-toggle';

function Test() {
  return (
    <div className="p-10 border rounded-lg space-y-10">
      <DarkModeToggle />
      <div className="w-40 h-40 border rounded-xl bg-background dark:bg-red-500">
        Tailwind dark:bg-red-500
      </div>
      <div className="w-40 h-40 border rounded-xl bg-foreground"></div>
      <div className="w-40 h-40 border rounded-xl bg-muted"></div>
      <div className="w-40 h-40 border rounded-xl bg-muted-foreground"></div>
    </div>
  );
}

export default Test;
