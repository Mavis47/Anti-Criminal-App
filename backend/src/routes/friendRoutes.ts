import  express  from "express";
import { SecureRoutes } from "../middleware/authmiddleware";
import { RespondToFriendRequest, SendRequests } from "../controllers/friend.controller";

const router = express.Router();

router.post('/sendRequest',SecureRoutes,SendRequests)
router.post('/receiveRequest',SecureRoutes,RespondToFriendRequest);

export default router;