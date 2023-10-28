
import mongoose from 'mongoose';
import 'dotenv/config';

export const connectdb = ()=>{
  mongoose.connect(process.env.DB_URI, {

  }).then(()=>console.log('db is connected'))
      .catch((e)=>console.log(e));
};


