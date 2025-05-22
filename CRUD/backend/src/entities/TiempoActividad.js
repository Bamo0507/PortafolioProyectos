import { Column } from 'typeorm';

export default class TimeActivity {
    @Column({type: 'timestamp', nullable: false })
    createdAt;

    @Column({ type: 'timestamp', nullable: true })
    inProgressAt;

    @Column({ type: 'timestamp', nullable: true })
    completedAt;
}