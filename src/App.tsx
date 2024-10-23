import loadable from '@loadable/component';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { store } from 'shared/stores';

const GlobalLayout = loadable(() => import('./shared/components/Layout'));
const CampaignsPage = loadable(() => import('./pages/campaigns/Page'));
const ReportPage = loadable(() => import('./pages/report/Page'));
const CampaignsAddPage = loadable(
  () => import('./pages/campaigns/pages/add/Page')
);
const CampaignsEditPage = loadable(
  () => import('./pages/campaigns/pages/edit/Page')
);
const ErrorPage = loadable(() => import('./ErrorPage'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <GlobalLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <CampaignsPage />
      },
      {
        path: 'report',
        element: <ReportPage />
      },
      {
        path: 'campaign/add',
        element: <CampaignsAddPage />
      },
      {
        path: 'campaign/edit/:id',
        element: <CampaignsEditPage />
      }
    ]
  }
]);

export const App = () => {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
};
