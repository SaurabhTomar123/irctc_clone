const API_KEY = process.env.API_KEY;

const checkAPI =(req,res,next) =>{
    //Retrieve api key from the Authorization Header
    const apiKey = req.header('x-api-key');

    //validate the api key
    if(apiKey !== API_KEY){
        return res.status(403).send('Forbidden: Invalid API key');
    }

    //if the api key is valid,proceed to the next middleware or route handler.
    next();
};

module.exports = checkAPI;
