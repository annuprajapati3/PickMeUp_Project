const jwt = require('jsonwebtoken');
const blackListToken = require('../model/blackListToken');
const privateKey = process.env.privateKey;
const AuthorizationC = async (req,res,next)=>{
    const token = req.headers.authorization.split(' ')[1];
    if(!token){
        return res.status(401).send({status : 'uthauthorize access'});
    }
    const blackList = await blackListToken.findOne({token});
    if(blackList){
        return res.status(401).send({status : 'uthauthorize access'});}
    try{
        const decoded = jwt.verify(token, privateKey);
        req.userId = decoded.id;
        next();
    }catch{
        return res.status(401).send({status : 'uthauthorize access'});
    }


}
module.exports = {AuthorizationC};