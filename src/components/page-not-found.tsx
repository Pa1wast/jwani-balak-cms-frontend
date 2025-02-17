import ErrorMessage from '@/components/ui/error-message';

function PageNotFound() {
  return (
    <div className="grid w-screen h-screen place-items-center">
      <ErrorMessage message="Page not found" goBack />
    </div>
  );
}

export default PageNotFound;
