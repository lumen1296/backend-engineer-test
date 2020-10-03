import { User } from "entities/User.entity";
import { UserDTO } from "@DTO/User.dto";


export const createUserOutputMapper = async (user: User): Promise<UserDTO> => {
  const userDTO : UserDTO ={
    id: user.id,
    name: user.name,
    lastName: user.lastName,
    email: user.email,
    password: user.password,
  };

  return userDTO;
}