import Db from './db-pg.js';

export default class CalificacionesRepository {
    constructor() {
        console.log('Estoy en: CalificacionesRepository.constructor()');
        this.db = new Db();
    }

    getAllAsync = async () => {
        console.log(`CalificacionesRepository.getAllAsync()`);
        const sql = `SELECT * FROM calificaciones`;
        return await this.db.queryAll(sql);
    }

    getByIdAsync = async (id) => {
        console.log(`CalificacionesRepository.getByIdAsync(${id})`);
        const sql = `SELECT * FROM calificaciones WHERE id=$1`;
        return await this.db.queryOne(sql, [id]);
    }

    createAsync = async (entity) => {
        console.log(`CalificacionesRepository.createAsync(${JSON.stringify(entity)})`);
        const sql = `
            INSERT INTO calificaciones (alumno_id, materia_id, nota, fecha)
            VALUES ($1, $2, $3, $4)
            RETURNING id
        `;
        const values = [
            entity?.alumnoId ?? null,
            entity?.materiaId ?? null,
            entity?.nota ?? null,
            entity?.fecha ?? null
        ];

        return await this.db.queryReturnId(sql, values);
    }

    updateAsync = async (entity) => {
        console.log(`CalificacionesRepository.updateAsync(${JSON.stringify(entity)})`);
        const sql = `
            UPDATE calificaciones 
            SET alumno_id = $2,
                materia_id = $3,
                nota = $4,
                fecha = $5
            WHERE id = $1
        `;

        const values = [
            entity.id,
            entity?.alumnoId ?? null,
            entity?.materiaId ?? null,
            entity?.nota ?? null,
            entity?.fecha ?? null
        ];

        return await this.db.queryRowCount(sql, values);
    }

    deleteByIdAsync = async (id) => {
        console.log(`CalificacionesRepository.deleteByIdAsync(${id})`);
        const sql = `DELETE FROM calificaciones WHERE id=$1`;
        return await this.db.queryRowCount(sql, [id]);
    }
}