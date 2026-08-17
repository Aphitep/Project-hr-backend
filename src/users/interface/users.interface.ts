import { Role } from 'src/enums/role.enum';

export interface User {
  id: number;
  username: string;
  password: string;
  role: Role;
}
