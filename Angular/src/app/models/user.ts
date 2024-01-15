export interface User {
  id: number;
  username: string;
  email: string;
  points: number;
}

export interface LoginDTO {  
  username?: string;
  password?: string;
}

export interface RegisterDTO {
  username: string;
  password: string;
  email: string;
}
export interface UpdateUser {
  email: string;
  password: string;
  id: number;
}

export interface Player{
  username: string;
  points :number;
}



