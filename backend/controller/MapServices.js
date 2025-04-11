const axios = require('axios')
const API = process.env.GOOGLE_API_MAP;
const getAddressCondinator = async (req , res)=>{
    const address = req.query.address;
    const url = `https://maps.gomaps.pro/maps/api/geocode/json?address=${address}&key=${API}`
    try{
        const response = await axios.get(url);
        if(response.data.status==="OK"){
            const location = response.data.results[0].geometry.location;
            return res.status(200).send({
                lat :location.lat,
                lng:location.lng
            })
                
            
        }else{
            res.send('bad ressuest')
        }
    }
    catch (err){
        console.log(err);
    }
}
const GetSuggestion =async (req,res)=>{
    const address = req.query.address;
    const url = `https://maps.gomaps.pro/maps/api/place/queryautocomplete/json?input=${address}&key=${API}`
    try{
        const response = await axios.get(url);
        if (response.data.status === "OK") {
            return res.status(200).json(response.data.predictions);
        } else {
            return res.status(400).json({ error: "Invalid request", details: response.data });
        }
    }
    catch{
        res.send({
            status : "catch err",
            
        })
    }
    
}

const getDistance = async (req,res)=>{
    const origin = req.query.origin;
    const destination = req.query.destination;
    const url = `https://maps.gomaps.pro/maps/api/distancematrix/json?destinations=${destination}&origins=${origin}&key=${API}`;
    
    try{
        const response = await axios.get(url);
        if(response.data.status === "OK"){
            const distance = response.data.rows[0].elements[0].distance;
            const time = response.data.rows[0].elements[0].duration;
            res.status(200).send({
                distance : distance.text,
                time : time.text
            })
        }else{
            res.send('bad ressuest')
        }
    }
    catch(err){
        console.log(err)
        res.send({
            status : "catch err",
            
        })
    }
}

const getDistancefunction = async (origin , destination)=>{
    const url = `https://maps.gomaps.pro/maps/api/distancematrix/json?destinations=${destination}&origins=${origin}&key=${API}`;
    
    try{
        const response = await axios.get(url);
        if(response.data.status === "OK"){
            const distance = response.data.rows[0].elements[0].distance;
            const time = response.data.rows[0].elements[0].duration;
            return distance.text
        }else{
            return('bad ressuest')
        }
    }
    catch(err){
        console.log(err)
    }
}
const getAddressCondinatorfx = async (address)=>{
    
    const url = `https://maps.gomaps.pro/maps/api/geocode/json?address=${address}&key=${API}`
    try{
        const response = await axios.get(url);
        if(response.data.status==="OK"){
            const location = response.data.results[0].geometry.location;
            return {
                lat :location.lat,
                lng:location.lng
            }
                
            
        }else{
            return ('bad ressuest')
        }
    }
    catch (err){
        console.log(err);
    }
}


module.exports = {
    getAddressCondinator,
    getDistance,
    getDistancefunction,
    GetSuggestion,
    getAddressCondinatorfx ,
}