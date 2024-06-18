import { AuthError } from '../utils/ErrorClasses.js';
import { verifyJSONTToken } from '../utils/authHelpers.js';

const isLoggedIn = async (req, res, next) => {
    console.log("Checking is logged in ")
    if (req.method === 'OPTIONS') {
        // If the request is an OPTIONS request, send a response with the necessary headers and status code 204
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        return res.status(204).send();
        //   return next();
    }
    if (!req.headers.authorization) {
        console.log("Auth headers not found")
        return next(new AuthError("User not authenticated, Please login"))
    }
    const authHeaders = req.headers.authorization.split(' ');
    if (authHeaders.length !== 2) {
        console.log("Auth headers not found")
        return next(new AuthError("User not authenticated, Please login"))
    }

    const authToken = authHeaders[1];
    console.log("auth token recieved ", authToken)
    try {
        const verifiedToken = verifyJSONTToken(authToken);
        req.token = verifiedToken;
    } catch (error) {
        return next(new AuthError("User not authenticated, Please login"))
    }

    //user is logged in, call next
    next();
}

export default isLoggedIn;