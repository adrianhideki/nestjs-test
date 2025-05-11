import { Injectable } from '@nestjs/common';
import { User } from './user';

@Injectable()
export class UsersService {
  private users: User[] = [
    { id: 1, name: 'John Doe', role: 'INTERN', email: '' },
    { id: 2, name: 'Jane Doe', role: 'ENGINEER', email: '' },
    { id: 3, name: 'Jim Doe', role: 'ADMIN', email: '' },
    { id: 4, name: 'Jack Doe', role: 'INTERN', email: '' },
    { id: 5, name: 'Jill Doe', role: 'ENGINEER', email: '' },
    { id: 6, name: 'Joe Doe', role: 'ADMIN', email: '' },
    { id: 7, name: 'Judy Doe', role: 'INTERN', email: '' },
    { id: 8, name: 'Jake Doe', role: 'ENGINEER', email: '' },
  ];

  public findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN'): User[] {
    if (!!role) {
      return this.users.filter((user) => user.role === role);
    }

    return this.users;
  }

  public findOne(id: number): User | undefined {
    return this.users.find((user) => user.id === id);
  }

  public create(user: User): User {
    const maxId = Math.max(...this.users.map((user) => user.id));
    const newUser = { ...user, id: maxId + 1 };

    this.users.push(newUser);
    return newUser;
  }

  public update(id: number, user: User): User | undefined {
    const index = this.users.findIndex((user) => user.id === id);

    if (index === -1) {
      return undefined;
    }

    this.users[index] = { ...this.users[index], ...user };
    return this.users[index];
  }

  public updatePartialy(id: number, user: Partial<User>): User | undefined {
    const index = this.users.findIndex((user) => user.id === id);

    if (index === -1) {
      return undefined;
    }

    this.users[index] = { ...this.users[index], ...user };
    return this.users[index];
  }

  public delete(id: number): User | undefined {
    const index = this.users.findIndex((user) => user.id === id);

    if (index === -1) {
      return undefined;
    }
    const deletedUser = this.users[index];
    this.users.splice(index, 1);
    return deletedUser;
  }
}
