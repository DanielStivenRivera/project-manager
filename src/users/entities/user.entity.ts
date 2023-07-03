import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: false })
  firstName: string;
  @Column({ nullable: true })
  secondName: string;
  @Column({ nullable: false })
  firstLastName: string;
  @Column({ nullable: true })
  secondLastName: string;
  @Column({ nullable: false })
  password: string;
  @Column({ unique: true, nullable: false })
  email: string;
  @Column({ unique: true, nullable: false })
  userName: string;
  @Column({ default: true })
  isActive: boolean;
}
