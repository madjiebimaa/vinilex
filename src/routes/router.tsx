import { createBrowserRouter } from 'react-router-dom';

import Color from './color';
import Root from './root';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
  },
  {
    path: '/colors/:colorID',
    element: <Color />,
  },
]);
