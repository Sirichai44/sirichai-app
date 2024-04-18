import { setProfile } from '@/store/reducers/authReducer';
import { useAppDispatch } from '@/store/store';
import { JwtPayload, jwtDecode } from 'jwt-decode';

interface User extends JwtPayload {
  username: string;
  email: string;
  exp: number;
}

const useCurrentUser = () => {
  // const currentUser = useAppSelector((state) => state.auth.profile);
  const token = localStorage.getItem('token');
  // if (currentUser.token !== '') {
  //   const data: User = jwtDecode(currentUser.token);
  //   useAppDispatch(
  //     setProfile({
  //       username: data.username,
  //       email: data.email,
  //       token: currentUser.token,
  //       login: true
  //     })
  //   );

  // } else
  if (token) {
    const user: User = jwtDecode(token);
    useAppDispatch(
      setProfile({
        username: user.username,
        email: user.email,
        token: token,
        login: true
      })
    );
    return true;
  } else {
    return false;
  }
};

export default useCurrentUser;
