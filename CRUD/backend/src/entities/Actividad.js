import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, ManyToOne, JoinTable } from 'typeorm';
import Proyecto     from './Proyecto.js';
import Prioridad    from './Prioridad.js';
import Etiqueta     from './Etiqueta.js';
import TimeActivity from './TimeActivity.js';
import Estado from './Estado.js';

@Entity()
export default class Actividad {
    @PrimaryGeneratedColumn()
    id;

    @Column({ type: 'varchar', length: 50 })
    nombreActividad;

    @ManyToOne(() => Proyecto, proyecto => proyecto.actividades, { nullable: false })
    proyecto;

    @Column({ type: 'enum', enum: Object.values(Estado)})
    estado;

    @Column(type => TimeActivity)
    tiempos;

    @ManyToOne(() => Prioridad, prioridad => prioridad.actividades, { nullable: false, default: 1})
    prioridad;

    @Column({type: 'int', default: 1, check: 'dificultad BETWEEN 1 AND 100'})
    dificultad;

    @ManyToMany(() => Etiqueta, etiqueta => etiqueta.actividades, {cascade: true})
    @JoinTable({
        name: 'actividad_etiquetas',
        joinColumn: {
            name: 'actividad_id',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'etiqueta_id',
            referencedColumnName: 'id'
        }
    })
    etiquetas;
}