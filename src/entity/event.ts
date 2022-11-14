import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  BaseEntity,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Length, IsDate, IsBoolean } from "class-validator";
import { Team } from "./team";
import Joi = require("joi");

/**
 * Event
 */
@Entity({ name: "events" })
export class Event extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("datetime", { nullable: false })
  @IsDate()
  event_date: Date;

  @Column("varchar", { length: 25 })
  @Length(1, 25)
  location: string;

  @ManyToOne(() => Team, {
    cascade: true,
  })
  @JoinColumn({ name: "homeId", referencedColumnName: "id" })
  home: Team;

  @ManyToOne(() => Team, {
    cascade: true,
  })
  @JoinColumn({ name: "awayId", referencedColumnName: "id" })
  away: Team;

  @Column("int", { default: 0 })
  home_score: number;

  @Column("int", { default: 0 })
  away_score: string;

  @Column("bool", { default: false })
  @IsBoolean()
  isLive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}

// JOI
export const JoiEventObject = Joi.object({
  id: Joi.number().optional(),
  event_date: Joi.date().required(),
  location: Joi.string().required(),
  homeId: Joi.number().required(),
  awayId: Joi.number().required(),
  home: Joi.object().optional(),
  away: Joi.object().optional(),
  home_score: Joi.number().optional(),
  away_score: Joi.number().optional(),
  isLive: Joi.boolean().optional(),
});
