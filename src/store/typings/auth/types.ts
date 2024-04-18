export interface IStateAuth {
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
  login: boolean;
  username: string;
  email: string;
  token: string;
}
export interface IApiReturnToken {
  token: string;
}

export interface ICurrenUser {
  username: string;
  email: string;
  token: string;
  exp: number;
}
