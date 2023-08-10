export interface User {
  id: number;
  username: string;
  password: string;
  email: string;
  points: number;
}

export interface LoginDTO {   
  username?: string;
  password?: string;
}

export interface RegisterDTO {
  userId: number;
  username: string;
  password: string;
  email: string;
}
export interface UserUpdate {
  email: string;
  password: string;
}
