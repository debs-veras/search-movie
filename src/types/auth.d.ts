export type Auth = {
  api_key: string;
  username: string;
  password: string;
};

export type ResquestToken = {
  username: string;
  password: string;
  request_token: string;
};
export type User = {
  id: number;
  name: string;
  username: string;
  avatar_path: string;
};
