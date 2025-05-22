import AppDataSource from '../data-source.js';
import Actividad     from '../entities/Actividad.js';
import Proyecto      from '../entities/Proyecto.js';
import Prioridad     from '../entities/Prioridad.js';
import Etiqueta      from '../entities/Etiquetas.js';

const actividadRepository = AppDataSource.getRepository(Actividad);
const proyectoRepository  = AppDataSource.getRepository(Proyecto);
const prioridadRepository = AppDataSource.getRepository(Prioridad);
const etiquetaRepository  = AppDataSource.getRepository(Etiqueta);

async function getAllActividades(req, res) {
    try {
        const actividades = await actividadRepository.find({
            relations: ['proyecto', 'prioridad', 'etiquetas'],
        });
        return res.status(200).json(actividades);
    } catch {
        return res.status(500).json({ message: 'Error al obtener las actividades' });
    }
}

async function getActividadById(req, res) {
    const { id } = req.params;
    try {
        const actividad = await actividadRepository.findOne({
            where: { id },
            relations: ['proyecto', 'prioridad', 'etiquetas'],
        });
        if (!actividad) {
            return res.status(404).json({ message: 'Actividad no encontrada' });
        }
        return res.status(200).json(actividad);
    } catch {
        return res.status(500).json({ message: 'Error al obtener la actividad' });
    }
}

async function createActividad(req, res) {
    const {
        nombreActividad,
        proyectoId,
        prioridadId,
        estado, tiempos, 
        dificultad,
        etiquetaIds = []
    } = req.body;

    try {
        const proyecto = await proyectoRepository.findOneBy({ id: proyectoId });
        const prioridad = await prioridadRepository.findOneBy({ id: prioridadId });
        const etiquetas = etiquetaIds.length
            ? await etiquetaRepository.findBy({ id: etiquetaIds })
            : [];
        if (!proyecto) {
            return res.status(404).json({ message: 'Proyecto no encontrado' });
        }
        if (!prioridad) {
            return res.status(404).json({ message: 'Prioridad no encontrada' });
        }

        const nuevaActividad = actividadRepository.createQueryBuilder({
            nombreActividad,
            proyecto,
            prioridad,
            estado,
            tiempos,
            dificultad,
            etiquetas
        });

        const resultado = await actividadRepository.save(nuevaActividad);
        return res.status(201).json(resultado);
    } catch {
        return res.status(500).json({ message: 'Error al crear la actividad' });
    }
}

async function updateActividad(req, res) {
    const id = req.params.id;
    const {
        nombreActividad,
        proyectoId,
        prioridadId,
        estado, tiempos, 
        dificultad,
        etiquetaIds = []
    } = req.body;

    try {
        const actividadRepo = actividadRepository();

        const actividad = await actividadRepo.findOne({
            where: { id },
            relations: ['proyecto', 'prioridad', 'etiquetas'],
        });
        if (!actividad) {
            return res.status(404).json({ message: 'Actividad no encontrada' });
        }

        actividad.nombreActividad = nombreActividad ?? actividad.nombreActividad;
        actividad.estado = estado ?? actividad.estado;
        actividad.tiempos = tiempos ?? actividad.tiempos;
        actividad.dificultad = dificultad ?? actividad.dificultad;

        if(proyectoId){
            const proyecto = await proyectoRepository().findOneBy({ id: proyectoId });
            if (!proyecto) {
                return res.status(404).json({ message: 'Proyecto no encontrado' });
            }
            actividad.proyecto = proyecto;
        }

        if(prioridadId){
            const prioridad = await prioridadRepository().findOneBy({ id: prioridadId });
            if (!prioridad) {
                return res.status(404).json({ message: 'Prioridad no encontrada' });
            }
            actividad.prioridad = prioridad;
        }

        if (etiquetaIds.length) {
            const etiquetas = await etiquetaRepository.findBy({ id: etiquetaIds });
            actividad.etiquetas = etiquetas;
        }

        const resultado = await actividadRepo.save(actividad);
        return res.status(200).json(resultado);
    }catch {
        return res.status(500).json({ message: 'Error al actualizar la actividad' });
    }
}

async function deleteActividad(req, res) {
    const { id } = req.params;
    try {
        const actividad = await actividadRepository.findOneBy({ id });
        if (!actividad) {
            return res.status(404).json({ message: 'Actividad no encontrada' });
        }
        await actividadRepository.delete(id);
        return res.status(204).send();
    } catch {
        return res.status(500).json({ message: 'Error al eliminar la actividad' });
    }
}

export {
    getAllActividades,
    getActividadById,
    createActividad,
    updateActividad,
    deleteActividad
};