import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { UserEntity } from "./UserEntity";

@Entity("movies")
export class MovieEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => UserEntity, (user) => user.movies, {
    onDelete: "CASCADE",
    nullable: false,
  })
  @JoinColumn({ name: "userId" })
  user?: UserEntity;

  @Column({ type: "uuid", name: "userId" })
  userId!: string;

  @Column({ type: "varchar" })
  title!: string;

  @Column({ type: "varchar", nullable: true })
  image?: string;

  @Column({ type: "varchar" })
  genre!: string;

  @Column({ type: "varchar" })
  classification!: string;

  @Column({ type: "varchar" })
  platform!: string;

  @Column({ type: "timestamptz" })
  showtime!: Date;

  @Column({ name: "durationMinutes", type: "int" })
  duration!: number;

  @Column({ type: "text", nullable: true })
  observation?: string;

  @Column({ type: "boolean", default: false })
  watched!: boolean;

  @Column({ type: "int", nullable: true })
  rating?: number;

  @CreateDateColumn({ type: "timestamptz" })
  createdAt!: Date;

  @UpdateDateColumn({ type: "timestamptz" })
  updatedAt!: Date;
}
