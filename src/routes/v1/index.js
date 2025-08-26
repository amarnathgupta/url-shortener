import { Router } from "express";
import urlRoutes from "./url.routes.js";

const router = Router();

// Prefix all routes with /api/v1
router.use("/url", urlRoutes);

export default router;
