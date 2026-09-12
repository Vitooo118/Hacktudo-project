import type { Request, Response } from "express";
import { generateLessonPlan } from "../services/pedagogical.service.js";

export async function createLessonPlan(
    req: Request,
    res: Response
) {
    try {
        const input = req.body;

        const lessonPlan = await generateLessonPlan(input);

        res.json(lessonPlan);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Erro ao gerar o roteiro pedagógico."
        });
    }
}