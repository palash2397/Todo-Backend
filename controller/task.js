import {taskModal} from "../modals/task.js"

export const newTask =async(req, res, next)=>{
  const { title, description} = req.body

  const task = await taskModal.create({title, description, user:req.user})
  res.json({
    success:true,
    message: "task added successfully",
    task

  })
}

export const getMyTask= async(req, res)=>{
    const userId = req.user._id;
    const tasks = await taskModal.find({user:userId});
    res.json({
        success:true,
        tasks
    })
}

export const removeTask = async(req, res)=>{
    try {
        const task = await taskModal.findById(req.params.id)
        if(!task){
            res.status(404).json({
                success:"false",
                message:"Invalid Task"
            })
        }
        await task.deleteOne()
    
        res.status(200).json({
            success:true,
            message:"task deleted succesfully"
        })
        
    } catch (error) {
        console.log(error)
        
    }
    
    

}


export const updateTask = async(req, res)=>{
    const { title} = req.body
    try {
        const task = await taskModal.findById(req.params.id);
        if(!task){
            res.status(404).json({
                success:"false",
                message:"Invalid Task"
            })
        }
        task.title= title;
        await task.save();
    
        res.status(200).json({
            success:true,
            message:"task updated successfully"
        })
        
    } catch (error) {
        console.log(error);
        
    }

}
