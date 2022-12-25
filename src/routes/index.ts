import { Router } from "express";

import rolesRoute from "./roles.route";

const router = Router();

router.use("/roles", rolesRoute);

export default router;
