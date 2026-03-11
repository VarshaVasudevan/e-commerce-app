const jwt=require('jsonwebtoken')

const generateToken=(id)=>{
    const token= jwt.sign({id},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRES_IN||'30d'});
    return token;
}

module.exports=generateToken;