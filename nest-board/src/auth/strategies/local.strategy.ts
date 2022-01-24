import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../auth.service";
import { LoginUserDto } from "../../user/dto/login-user.dto";
import { User } from "src/user/user.entity";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({
            usernmaeField: 'email'
        });
    }

    async validate(email: string, password: string): Promise<User> {
        let loginUserDto: LoginUserDto = {
            email: email,
            password: password,
        }

        const user = await this.authService.validateUser(loginUserDto);

        if(!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}
