import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from 'entities/User.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDTO } from '@DTO/User.dto';
import { getUserByEmail } from '@modules/user/mappers/getUserByEmail.mapper';
import { createUserOutputMapper } from '@modules/user/mappers/createUserOutput.mapper';
import { PlaceDTO } from '@DTO/place.dto';
import { HttpService } from '@nestjs/common/http/http.service';
@Injectable()
export class UserService {


  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private httpService: HttpService
  ) { }


  async getUserByEmail(email: String): Promise<UserDTO> {

    const user = await this.userRepository.findOne({
      where: {
        email: email
      }
    });

    if (!user) {
      throw new NotFoundException();
    }
    return Promise.resolve(await getUserByEmail(user));
  }

  async createUSer(userDTO: UserDTO): Promise<UserDTO> {
    const userSaved = await this.userRepository.save({
      name: userDTO.name,
      lastName: userDTO.lastName,
      email: userDTO.email,
      password: userDTO.password,
    });
    return Promise.resolve(await createUserOutputMapper(userSaved));
  }

  async getUserById(id: number) {
    const user = await this.userRepository.findOne({ id });
    if (user) {
      return user;
    }
    throw new NotFoundException();;
  }

  async getPlacesByLocation(placeDTO: PlaceDTO): Promise<any> {

    const response = await this.httpService.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${placeDTO.location}&radius=${placeDTO.radius}&type=${placeDTO.type}&key=${placeDTO.key}`)
      .toPromise();

    return response.data.results;
  }



}
