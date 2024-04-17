import { useEffect } from 'react';
import { JwtPayload, jwtDecode } from 'jwt-decode';
import moment from 'moment';
import useNavigateTo from '@/hook/useNavigateTo';
interface Props {
  children: React.ReactNode;
}

interface User extends JwtPayload {
  username: string;
  email: string;
  exp: number;
}

const AuthProvider = (props: Props) => {
  const navigateTo = useNavigateTo();

  const currentUser = localStorage.getItem('token');
  const decodeUser: User | null = currentUser ? jwtDecode(currentUser) : null;

  useEffect(() => {
    if (decodeUser) {
      const expired = moment(decodeUser.exp).isBefore(moment());
      if (expired) {
        localStorage.removeItem('token');
        navigateTo('/auth/login');
      }
    } else {
      navigateTo('/');
    }
  }, []);

  if (!currentUser) {
    return null;
  }

  return <>{props.children}</>;
};

export default AuthProvider;
