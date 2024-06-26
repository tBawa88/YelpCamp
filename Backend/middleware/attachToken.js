import { AuthError } from '../utils/ErrorClasses.js';
import { verifyJSONTToken } from '../utils/authHelpers.js';

/** 
 Purpose : This MW is for attaching the _id of current logged in user to the response sent to frontend
 So that we can conditionally show/hide the edit delete buttons of a campgrounds
 */
const attachToken = async (req, res, next) => {
    if (req.method === 'OPTIONS') {
        // If the request is an OPTIONS request, send a response with the necessary headers and status code 204
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        return res.status(204).send();
        //   return next();
    }
    if (!req.headers.authorization) {
        console.log("Auth headers not found")
        return next();
    }
    const authHeaders = req.headers.authorization.split(' ');
    if (authHeaders.length !== 2) {
        console.log("Auth headers not found")
        return next()
    }

    const authToken = authHeaders[1];

    try {
        const verifiedToken = verifyJSONTToken(authToken);
        req.token = verifiedToken;  //attaching the userId and calling next 
    } catch (error) {
        return next()
    }

    next();
}

export default attachToken;