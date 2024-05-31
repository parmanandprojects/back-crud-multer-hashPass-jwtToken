import  jwt  from "jsonwebtoken";

export const jwtTokenGenerate=async(userId)=>{
    try{
       let token= jwt.sign({userId},process.env.JWT_SECREATE_KEY)
       return token;

    }catch(err){
        console.log(err)
        throw err; 
    }
}