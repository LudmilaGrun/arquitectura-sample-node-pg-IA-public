import express from "express";
import CalificacionesService from "../services/calificaciones-service.js";

const router = express.Router();
const service = new CalificacionesService();

router.get("/", async (req, res) => {
    const data = await service.getAllAsync();
    res.status(200).json(data);
});

router.get("/:id", async (req, res) => {
    const data = await service.getByIdAsync(req.params.id);

    if (!data) {
        return res.status(404).json({ message: "No encontrado" });
    }

    res.status(200).json(data);
});

router.post("/", async (req, res) => {
    const id = await service.createAsync(req.body);
    res.status(201).json(id);
});

router.put("/:id", async (req, res) => {
    const entity = {
        id: parseInt(req.params.id),
        ...req.body
    };

    const rows = await service.updateAsync(entity);
    res.status(200).json(rows);
});

router.delete("/:id", async (req, res) => {
    const rows = await service.deleteByIdAsync(req.params.id);
    res.status(200).json(rows);
});

export default router;