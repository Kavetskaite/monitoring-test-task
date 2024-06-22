import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";

@Entity()
export class Screenshot {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "varchar",
    nullable: false,
  })
  appUrl: string;

  @Column({
    type: "varchar",
    nullable: false,
  })
  screenshotPath: string;

  @CreateDateColumn()
  createdBy: Date;
}
