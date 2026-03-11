const User=require('../models/User');
const generateToken=require('../util/generateToken');

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user exists
        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create user
        const user = await User.create({
            name,
            email,
            password
        });

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ 
            message: 'Server error', 
            error: error.message 
        });
    }
};

const loginUser=async(req,res)=>{

    const{email,password}=req.body;

    const user=await User.findOne({email});

    if(user && (await user.matchPassword(password))){
        res.status(200).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            token:generateToken(user._id)
        })
    }
    else{
        res.status(401).json({message:'Invalid email or password'})
    }

}

const getUserProfile=async(req,res)=>{
    const id=req.user._id;

    const user=await User.findById(id);

    if(user){
        res.status(200).json({
            _id:user._id,
            name:user.name,
            email:user.email
        })
    }
    else{
        res.status(404).json({message:'User not found'})
    }
}

const updateUserProfile=async(req,res)=>{
    const id=req.user._id;

    const {name,email,password}=req.body;

    const user=await User.findById(id);

    if(user){
        user.name=name;
        user.email=email;
        user.password=password;
    

    const updatedUser=await user.save();

    res.status(200).json({
        _id:updatedUser._id,
        name:updatedUser.name,
        email:updatedUser.email,
        token:generateToken(updatedUser._id)
    })
}
    else{
        res.status(404).json({message:'User not found'})
    }



}

module.exports={registerUser,loginUser,getUserProfile,updateUserProfile}