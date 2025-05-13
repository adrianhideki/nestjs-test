import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDto } from './dto/user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private users: UserDto[] = [
    { id: 1, name: 'John Doe', role: 'INTERN', email: '' },
    { id: 2, name: 'Jane Doe', role: 'ENGINEER', email: '' },
    { id: 3, name: 'Jim Doe', role: 'ADMIN', email: '' },
    { id: 4, name: 'Jack Doe', role: 'INTERN', email: '' },
    { id: 5, name: 'Jill Doe', role: 'ENGINEER', email: '' },
    { id: 6, name: 'Joe Doe', role: 'ADMIN', email: '' },
    { id: 7, name: 'Judy Doe', role: 'INTERN', email: '' },
    { id: 8, name: 'Jake Doe', role: 'ENGINEER', email: '' },
  ];

  public findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN'): UserDto[] {
    let result = this.users;

    if (!!role) {
      result = this.users.filter((user) => user.role === role);
    }

    if (result.length === 0) {
      throw new NotFoundException('No users found');
    }

    return this.users;
  }

  public findOne(id: number): UserDto {
    const result = this.users.find((user) => user.id === id);

    if (!result) {
      throw new NotFoundException('User not found');
    }

    return result;
  }

  public create(user: CreateUserDto): UserDto {
    const maxId = Math.max(...this.users.map((user) => user.id));
    const newUser = { ...user, id: maxId + 1 };

    this.users.push(newUser);
    return newUser;
  }

  public update(id: number, user: UpdateUserDto): UserDto {
    const index = this.users.findIndex((user) => user.id === id);

    if (index === -1) {
      throw new NotFoundException('User not found');
    }

    this.users[index] = { ...this.users[index], ...user };
    return this.users[index];
  }

  public updatePartialy(
    id: number,
    user: Partial<UpdateUserDto>,
  ): UserDto | undefined {
    const index = this.users.findIndex((user) => user.id === id);

    if (index === -1) {
      throw new NotFoundException('User not found');
    }

    this.users[index] = { ...this.users[index], ...user };
    return this.users[index];
  }

  public delete(id: number): UserDto {
    const index = this.users.findIndex((user) => user.id === id);

    if (index === -1) {
      throw new NotFoundException('User not found');
    }

    const deletedUser = this.users[index];
    this.users.splice(index, 1);
    return deletedUser;
  }
}
