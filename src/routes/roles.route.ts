import { Router } from "express";

import rolesController from "../controllers/roles.controller";

const router = Router();

router.route("/").get(rolesController.get);

export default router;
