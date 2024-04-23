export interface IStateAuth {
  profile: IAuthProfile;
  current_info: ICurrentInfo;
  assistant: { content: '' };
  // assistant: { content: IContentAssistant[] };
}

export interface IContentAssistant {
  text: string;
  role: string;
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

export interface ICurrentInfo {
  system: string;
  position: IPosition;
  weather: IWeather;
}

export interface IPosition {
  latitude: number;
  longitude: number;
}

export interface IWeather {
  loading: boolean;
  weather: string;
  description: string;
  icon: string;
  temp: number;
  feels_like: number;
  humidity: number;
  wind: { speed: number; deg: number };
  clouds: number;
  system: {
    country: string;
    name: string;
    sunrise: number;
    sunset: number;
    timezone: number;
  };
}
