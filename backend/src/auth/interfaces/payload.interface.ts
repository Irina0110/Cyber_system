import {$Enums} from "../../../prisma/generated";

export interface JwtPayload {
  id: number;
  username: string;
  role: $Enums.Role,
  email: string
}
