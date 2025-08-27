import { Router } from "express";
import { redirectUrl, shortenUrl } from "../../controllers/url.controller.js";

const router = Router();

router.post("/shorten", shortenUrl);
router.get("/:urlCode", redirectUrl);

export default router;
