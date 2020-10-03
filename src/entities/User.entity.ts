import { Column, Entity, PrimaryGeneratedColumn, Unique} from 'typeorm';

@Entity({ name: 'user' })
@Unique(["email"])
export class User {

    @PrimaryGeneratedColumn({ name: 'id' })
    id: number;

    @Column({ name: 'name' })
    name: string;

    @Column({ name: 'lastName' })
    lastName: string;

    
    @Column({ name: 'email' })
    email: string;

    @Column({ name: 'password' })
    password: string;



}