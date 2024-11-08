import  express  from "express";
import { SecureRoutes } from "../middleware/authmiddleware";
import { AddQueries, getQueries } from "../controllers/query.controller";

const router = express.Router();

router.post('/add-query',SecureRoutes,AddQueries);
router.get('/get-query',SecureRoutes,getQueries);

export default router;
