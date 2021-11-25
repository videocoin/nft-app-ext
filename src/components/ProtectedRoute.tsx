import { Route, useNavigate } from 'react-router-dom';
import { useMount } from 'react-use';
import { useStore } from 'store';

const ProtectedRoute = ({ element: Component, ...rest }: any) => {
  const { isAuth } = useStore('metamaskStore');
  const navigate = useNavigate();
  useMount(() => {
    if (!isAuth) {
      navigate('/', { replace: true });
    }
  });

  return isAuth ? <Route {...rest} element={<Component />} /> : null;
};

export default ProtectedRoute;
