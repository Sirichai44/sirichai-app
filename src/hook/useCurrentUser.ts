import { setProfile } from '@/store/reducers/authReducer';
import { useAppDispatch } from '@/store/store';
import { JwtPayload, jwtDecode } from 'jwt-decode';
import moment from 'moment';

interface User extends JwtPayload {
  username: string;
  email: string;
  exp: number;
}
interface IUserReturn {
  isExpired: boolean;
}
const useCurrentUser = (): IUserReturn => {
  const token = localStorage.getItem('token');
  if (token) {
    const user: User = jwtDecode(token);

    const isExpired = moment(user.exp).isBefore(moment().unix());

    if (isExpired) {
      localStorage.removeItem('token');
      return { isExpired: true };
    }

    useAppDispatch(
      setProfile({
        username: user.username,
        email: user.email,
        token: token,
        login: true
      })
    );
  }
  return { isExpired: false };
};

export default useCurrentUser;
