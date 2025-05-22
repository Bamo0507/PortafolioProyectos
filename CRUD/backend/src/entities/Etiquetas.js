import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany } from 'typeorm';
import { Actividad } from './Actividad.js';

@Entity()
export default class Etiqueta {
    @PrimaryGeneratedColumn()
    id;

    @Column({ type: 'varchar', length: 30, unique: true })
    nombreEtiqueta;

    @ManyToMany(() => Actividad, actividad => actividad.etiquetas)
    actividades;
}