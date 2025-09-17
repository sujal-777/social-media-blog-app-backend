import User from '../model/User.js';
import bcrypt from "bcryptjs";

export const getAllUser = async (req, res, next) => {
    let users;
    try {
        users = await User.find();  // Use the correct model name
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Server Error" });
    }

    if (!users) {
        return res.status(404).json({ message: "No Users Found" });
    }

    return res.status(200).json({ users });
};

export const signup = async (req,res, next) => {
    const {name, email, password} = req.body;

    let existingUser;
    try {
        existingUser = await User.findOne({email});

    } catch (error) {
       return console.log(err);
    }
    if(existingUser) {
        return res.status(400).json({message: "UserAlready Exist! please login"})
    }
    const hashedPassword = bcrypt.hashSync(password);

    const user = new User({
        name,
        email,
        password : hashedPassword,
        blogs : [],
           
    });

    try {
        await user.save();

    } catch (error) {
       return console.log(err);
        
    }
    return res.status(201).json({user})

};

// export const login = async (req, res, next) =>{
//     const { email, password} = req.body;
//     let existingUser;

//     try {
//         existingUser = await User.findOne({email})
//     } catch (err) {
//         return console.log(err);
        
//     }
//     if (!existingUser) {
//         return res
//         .status(404)
//         .json({message : "Couldn't Find the User by this Mail"});
//     }

//     const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
//     if(!isPasswordCorrect) {
//         return res.status(400).json({message : "Incorect PassWord"})
//     } 
//     return res.status(200).json({message: "Login Successfully"})
// }


export const login = async (req, res, next) => {
  const { email, password } = req.body;

  let user;
  try {
    // Make sure password is loaded so we can compare
    user = await User.findOne({ email }).select('_id name email password');
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Login failed' });
  }

  if (!user) {
    return res.status(404).json({ message: "Couldn't find the user by this email" });
  }

  const isPasswordCorrect = bcrypt.compareSync(password, user.password);
  if (!isPasswordCorrect) {
    return res.status(400).json({ message: 'Incorrect password' });
  }

  // If you use JWTs, sign here and include token
  // const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

  const safeUser = { _id: user._id, name: user.name, email: user.email };
  return res.status(200).json({
    message: 'Login Successfully',
    user: safeUser,
    // token
  });
};
