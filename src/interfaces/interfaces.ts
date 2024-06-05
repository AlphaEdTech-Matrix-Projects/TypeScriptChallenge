export interface IExecuteQuery {
  query: string;
  args?: any[];
}

export interface IUser {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  squadId?: string | null;
  isAdmin: boolean;
}

export interface ISquad {
  id: string;
  name: string;
  leaderId: string;
}
