const { json } = require('express');
/* configuration to access secret keys from .env file  and install using (npm install --save dotenv)*/
require('dotenv').config()
const UserModel = require('../model/user');
const { addMonth,generateUserId } = require('../utilities/helper');
//  const { validator } = require('../utilities/helper');
const validators = require('../utilities/validator');
const bcrypt=require('bcrypt');
//install jsonwebtoken npm install jsonwebtoken
const jwt = require('jsonwebtoken');
// seeding initial data
/* configuration to access secret keys from .env file */

const registerUser = async (req, res, next) => {
        try {
                let userObj = req.body;
                const user=req.body.username;
                if(validators.validateUsername(req.body.username) && validators.validateEmail(req.body.emailId) && validators.validateMobileNo(req.body.mobileNo) && validators.validatePassword(req.body.password)){
                        let registeredUser = await UserModel.findOne({username:user});
                        let emailIsAlreadyRegister = await UserModel.findOne({emailId:req.body.emailId});
                        if(registeredUser != null){
                                return res.status(400).json({status:'failed', message: 'UserName Already exists' });
                        }
                        else if(emailIsAlreadyRegister != null){
                                return res.status(400).json({status:'failed', message: 'EmailId Already exists' });
                        }
                        else{   
                        const saltRounds = 10;
                        req.body.password=await bcrypt.hash(req.body.password, saltRounds);
                            let newUserId = await generateUserId();
                            console.log("User ID Value"+newUserId);
                            const newUser=await UserModel.create({ ...req.body, _id: newUserId});
                            if(newUser){
                                return res.status(201).json({ status:'success',message: `${newUser.username} registered successfully` ,data:newUser});
                            }
                        }
                }else if(!validators.validateUsername(req.body.username)){
                        return res.status(400).json({status:'failed', message: 'Invalid UserName' }); 
                }else if(!validators.validateEmail(req.body.emailId)){
                   return res.status(400).json({status:'failed', message: 'Invalid Email' });
                }else if(!validators.validateMobileNo(req.body.mobileNo)){
                        return res.status(400).json({status:'failed', message: 'Invalid Mobile Number' });
                }else if(!validators.validatePassword(req.body.password)){
                        return res.status(400).json({status:'failed', message: 'Invalid Password' }); 
                }
            } catch (err) {
                next(err);
            }
};
const loginUser=async(req,res,next)=>{
        try{
        const userObj=req.body;
        console.log(userObj);
        const emailId=userObj.username;
               if(userObj.username==='' && userObj.password===''){
                return res.status(404).json({status:'failed', message: 'All Fields Are Mandatory ' });
               }else if(userObj.username===''){
                   return res.status(404).json({status:'failed', message: 'Username Field in Mandatory' });
               }else if(userObj.password===''){
                   return res.status(404).json({status:'failed', message: 'Password Field in Mandatory' });
               }
        let userData = await UserModel.findOne({emailId:emailId});
        if(userData){
                //decrypt password and compare password
               const comparePassword=await bcrypt.compare(userObj.password, userData.password);
                if (!comparePassword) {
                        return res.status(404).json({status:'failed', message: 'Password Is Wrong' });
                }else if(comparePassword === true && userData !== null){
                         let jwtPayload = { userName: userData.userName, iat: Math.floor(Date.now() / 1000) - 60, exp: Math.floor(Date.now() / 1000) + (60 * 60) };
                         const accessToken = jwt.sign(jwtPayload, process.env.ACCESS_TOKEN_SECRET);
                        //  res.json({ message: `${userData.username} logged in successfully`, accessToken: accessToken });
                        return res.status(200).json({ status:'success',message: `${userData.username} Login successfully` ,accessToken: accessToken});
                }
        }else{
           return res.status(404).json({status:'failed', message: 'Email Id Is not Registered' });
        }
        }catch(err){
         next(err);
        }
       
       
}
module.exports = { registerUser,loginUser};
