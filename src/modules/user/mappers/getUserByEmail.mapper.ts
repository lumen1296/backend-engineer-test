import { User } from "entities/User.entity";
import { UserDTO } from "@DTO/User.dto";


export const getUserByEmail = async (user: User): Promise<UserDTO> => {
  const userDTO : UserDTO ={
    id: user.id,
    email: user.email,
    password: user.password,
  };

  return userDTO;
}