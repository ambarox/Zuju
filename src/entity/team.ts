import Joi = require("joi");
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  BaseEntity,
} from "typeorm";

/**
 * Subject
 */
@Entity({ name: "teams" })
export class Team extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar", { length: 25 })
  name: string;

  @Column("varchar", { length: 50 })
  logo: string;

  // and other team attributes comes here...

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}


// JOI
export const JoiTeamObject = Joi.object({
  id: Joi.number().optional(),
  name: Joi.string().required(),
  logo: Joi.string().required(),
});