import { ArrowLeft, Frown } from 'lucide-react';
import { Button } from './button';
import { useMoveBack } from '@/hooks/useMoveBack';

interface ErrorMessageProps {
  message: string;
  goBack?: boolean;
}

function ErrorMessage({ message, goBack = false }: ErrorMessageProps) {
  const handleGoBack = useMoveBack();
  return (
    <div className="mx-auto w-max flex flex-col gap-2 items-center">
      <p className="text-lg font-semibold flex gap-2 items-center  text-red-500 dark:text-red-500 p-2 bg-destructive/10 dark:bg-red-500/20 w-max rounded-lg">
        <Frown />
        {message}
      </p>

      {goBack && (
        <Button variant="ghost" size="sm" onClick={handleGoBack}>
          <ArrowLeft />
          Go Back
        </Button>
      )}
    </div>
  );
}

export default ErrorMessage;
