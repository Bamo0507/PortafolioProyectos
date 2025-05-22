import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Actividad } from './Actividad.js';

@Entity()
export default class Prioridad {
    @PrimaryGeneratedColumn()
    id;

    @Column({ type: 'varchar', length: 30, unique: true })
    nombre;

    @OneToMany(() => Actividad, actividad => actividad.prioridad)
    actividades;
}