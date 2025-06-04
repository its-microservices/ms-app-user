// src/user/dto/create-user.dto.ts
import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class CreateUserDto {
    @IsString()
    firstName: string;

    @IsString()
    lastName: string;

    @IsOptional()
    @IsBoolean()
    isActive?: boolean;
}
