import mongoose from "mongoose"

export const dbConnect=()=>{
    try{
        mongoose.connect("mongodb+srv://parmanandkumawat:abhipri94@cluster0.daklven.mongodb.net/crud-practice-api")
        console.log("Database connected")
    }catch(err){
        console.log(err)
    }
}