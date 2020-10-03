import { Controller, Get, Query} from '@nestjs/common';
import { UserService } from '@modules/user/services/user/user.service';
import { Body, Req } from '@nestjs/common/decorators/http/route-params.decorator';
import { PlaceDTO } from '@DTO/place.dto';
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';
import JwtAuthenticationGuard from '@modules/auth/guards/jwt-authentication.guard';

@Controller('user')
export class UserController {
    constructor(
        private userService: UserService
      ) {}
    
      @Get('getUserByEmail/:email')
      getUserByEmail(@Query('email') email: string) {
        console.log('data', email);
        return this.userService.getUserByEmail(email);
      }
      
 
      @Get('getPlacesByLocation')
      getPlacesByLocation(@Body() placeDTO: PlaceDTO) {
        //console.log('data', placeDTO.key);
        return this.userService.getPlacesByLocation(placeDTO);
      }
    
}
