import {$Enums} from "../../../prisma/generated";

export interface LoginStatus {
  id: number;
  role: $Enums.Role;
  username: string;
  accessToken: any;
  expiresIn: any;
}
