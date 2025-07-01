export const EnvList = [
  'local',
  'development',
  'qa',
  'staging',
  'production',
] as const;

export interface UserData {
  id: string;
  // email: string;
  accessToken: string;
  refreshToken: string;
  _authTokenVersion: number;
}

export interface FakeUser {
  name: { first: string; last: string };
  email: string;
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
}

export type LanguageType = 'en' | 'de';

export type ApiEndpointUrl = string;
