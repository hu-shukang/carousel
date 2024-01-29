import Page1 from '@/pages/page1';
import { Navigate, RouteObject, useRoutes } from 'react-router-dom';

const routes: RouteObject[] = [
  {
    path: '',
    element: <Navigate to={'/1'} />,
  },
  {
    path: '/1',
    element: <Page1 />,
  },
];

const Router = () => {
  const router = useRoutes(routes);
  return router;
};

export default Router;
