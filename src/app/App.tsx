import { RouterProvider } from 'react-router';
import { Toaster } from './components/ui/sonner';
import { router } from './routes';
import { AuthProvider } from './contexts/AuthContext';

export default function App() {
  return (
    <AuthProvider>
      <div className="size-full bg-[#F9FAFB]">
        <div className="max-w-md mx-auto h-full relative">
          <RouterProvider router={router} />
          <Toaster />
        </div>
      </div>
    </AuthProvider>
  );
}