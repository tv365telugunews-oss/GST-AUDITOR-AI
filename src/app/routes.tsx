import { createBrowserRouter } from 'react-router';
import { Layout } from './Layout';
import { ProtectedRoute } from './components/ProtectedRoute';
import Welcome from './pages/Welcome';
import Auth from './pages/Auth';
import SubscriptionGateway from './pages/SubscriptionGateway';
import Terms from './pages/Terms';
import AdminPanel from './pages/AdminPanel';
import Dashboard from './pages/Dashboard';
import SalesList from './pages/SalesList';
import AddSale from './pages/AddSale';
import Purchases from './pages/Purchases';
import GSTReturns from './pages/GSTReturns';
import GSTTools from './pages/GSTTools';
import Alerts from './pages/Alerts';
import Reports from './pages/Reports';
import More from './pages/More';
import Profile from './pages/Profile';
import Business from './pages/Business';
import Notifications from './pages/Notifications';
import Compliance from './pages/Compliance';
import Help from './pages/Help';
import Settings from './pages/Settings';
import Subscription from './pages/Subscription';

function NotFound() {
  return <div>404 - Page Not Found</div>;
}

export const router = createBrowserRouter([
  // Public routes
  {
    path: '/welcome',
    element: <Welcome />,
  },
  {
    path: '/auth',
    element: <Auth />,
  },
  {
    path: '/terms',
    element: <Terms />,
  },
  {
    path: '/subscribe',
    element: (
      <ProtectedRoute>
        <SubscriptionGateway />
      </ProtectedRoute>
    ),
  },
  {
    path: '/admin',
    element: (
      <ProtectedRoute adminOnly>
        <AdminPanel />
      </ProtectedRoute>
    ),
  },
  // Protected routes with layout
  {
    path: '/',
    element: (
      <ProtectedRoute requireSubscription>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: 'sales',
        element: <SalesList />,
      },
      {
        path: 'sales/add',
        element: <AddSale />,
      },
      {
        path: 'purchases',
        element: <Purchases />,
      },
      {
        path: 'purchases/add',
        element: <AddSale />,
      },
      {
        path: 'returns',
        element: <GSTReturns />,
      },
      {
        path: 'returns/:id',
        element: <GSTReturns />,
      },
      {
        path: 'tools',
        element: <GSTTools />,
      },
      {
        path: 'alerts',
        element: <Alerts />,
      },
      {
        path: 'reports',
        element: <Reports />,
      },
      {
        path: 'more',
        element: <More />,
      },
      {
        path: 'profile',
        element: <Profile />,
      },
      {
        path: 'business',
        element: <Business />,
      },
      {
        path: 'notifications',
        element: <Notifications />,
      },
      {
        path: 'compliance',
        element: <Compliance />,
      },
      {
        path: 'help',
        element: <Help />,
      },
      {
        path: 'settings',
        element: <Settings />,
      },
      {
        path: 'subscription',
        element: <Subscription />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);