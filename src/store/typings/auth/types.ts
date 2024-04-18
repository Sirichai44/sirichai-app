export interface IStateAuth {
  is_loading: boolean;
  set_user: boolean;
  profile: IAuthProfile;
}

//call register
export interface IAuthRegister {
  username: string;
  email: string;
  password: string;
  confirm_password: string;
}

export interface IAuthProfile {
  username: string;
  email: string;
}
export interface IApiReturnToken {
  token: string;
}
