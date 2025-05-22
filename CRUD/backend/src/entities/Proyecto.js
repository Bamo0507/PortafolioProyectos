import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Actividad } from './Actividad.js';

@Entity()
export default class Proyecto {
    @PrimaryGeneratedColumn()
    id;

    @Column({ type: 'varchar', length: 50 })
    nombre;

    @Column({ type: 'varchar', length: 50 })
    descripcion;

    @OneToMany(() => Actividad, actividad => actividad.proyecto)
    actividades;
}