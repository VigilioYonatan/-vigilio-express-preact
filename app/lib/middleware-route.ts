import { type Request, type Response } from "express";

export async function middlewareRoute(req: Request, res: Response) {
    if (req.path.includes("/api")) {
        return res.status(404).json({
            error: 404,
            success: false,
            message: "This endpoint is not correct",
        });
    }
    if (req.path.includes("/admin")) {
        res.status(404);
        const message =
            (req as Request & { errorMessage: string }).errorMessage ||
            "No se encontró esta página";
        res.render("admin/404", { message, title: "404" });
        return;
    }
    res.status(404);
    res.render("web/404");
}
