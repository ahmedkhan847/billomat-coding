import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  biography: string

  @Column()
  age: number

  @Column({
    nullable: true
  })
  image: string
}
