import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("movies")
export class MovieEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar" })
  title!: string;

  @Column({ type: "varchar" })
  image!: string;

  @Column({ type: "varchar" })
  genre!: string;

  @Column({ type: "varchar" })
  userId!: string;

  @Column({ type: "varchar" })
  classification!: string;

  @Column({ type: "varchar" })
  platform!: string;

  @Column({ type: "datetime" })
  showtime!: Date;

  @Column({ type: "number" })
  duration!: number;

  @Column({ type: "varchar" })
  observation?: string;

  @Column({ type: "boolean" })
  watched!: boolean;

  @Column({ type: "number" })
  rating!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
