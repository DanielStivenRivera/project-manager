export class CreateUserDto {
  password: string;
  email: string;
  firstName: string;
  secondName?: string;
  secondLastName?: string;
  firstLastName: string;
  userName: string;
  isActive: boolean;
}
