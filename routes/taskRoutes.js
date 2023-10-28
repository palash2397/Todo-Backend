import  express  from "express";
import { isAuthenticate } from "../middlewares/auth.js";
import { getMyTask, newTask, removeTask, updateTask } from "../controller/task.js";
const router = express();

router.post("/new", isAuthenticate, newTask);
router.get('/all', isAuthenticate, getMyTask)
router.delete('/remove',  isAuthenticate, removeTask)
router.put('/update', isAuthenticate, updateTask)

router.route('/:id').put(isAuthenticate, updateTask).delete(isAuthenticate, removeTask)

// router.delete('/delete', isAuthenticate, )



export default router;