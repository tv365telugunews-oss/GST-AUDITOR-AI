import { Outlet } from 'react-router';
import { BottomNav } from './components/BottomNav';
import { AIAssistant } from './components/AIAssistant';
import { Toaster } from 'sonner';

export function Layout() {
  return (
    <>
      <Outlet />
      <BottomNav />
      <AIAssistant />
      <Toaster position="top-center" richColors />
    </>
  );
}