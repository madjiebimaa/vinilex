import { createBrowserRouter } from 'react-router-dom';

import Color from './color';
import Image from './image';
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
  {
    path: '/images',
    element: <Image />,
  },
]);
