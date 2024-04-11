import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Loading from './Loading';

function SuspenseWrapper() {
  return (
    <Suspense fallback={<Loading />}>
      <Outlet />
    </Suspense>
  );
}

export default SuspenseWrapper;
