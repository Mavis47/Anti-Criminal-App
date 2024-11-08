import  express  from "express";
import { SecureRoutes } from "../middleware/authmiddleware";
import { AddLocation, getLocation } from "../controllers/geolocation.controller";

const router = express.Router();

router.get('/get-location',SecureRoutes,getLocation);
router.post('/add-location',SecureRoutes,AddLocation);

export default router;