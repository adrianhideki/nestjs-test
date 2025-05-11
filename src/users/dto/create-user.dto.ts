import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(['INTERN', 'ENGINEER', 'ADMIN'], {
    message: 'Invalid role.',
  })
  role: 'INTERN' | 'ENGINEER' | 'ADMIN';

  @IsEmail()
  email: string;
}
