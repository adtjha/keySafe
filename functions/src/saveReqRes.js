const functions = require("firebase-functions");

// Search Results handling function
// create new api function
// create new user function
// store each function call, request and response.
function saveReqRes(req, res, body) {
    let log = {
        req: {
            status: {
                code: req.statusCode,
                message: req.statusMessage,
            },
            headers: req.headers,
            ip: req.ip,
            ips: req.ips,
            hostname: req.hostname,
            xhr: req.xhr,
            signedCookies: req.signedCookies,
            httpVersion: req.httpVersion,
            method: req.method,
            body: req.body,
            query: req.query,
            parameters: req.params
        }, res: {
            status: {
                code: res.statusCode,
                message: res.statusMessage,
            },
            headers: res.headers,
            ip: res.ip,
            ips: res.ips,
            hostname: res.hostname,
            xhr: res.xhr,
            signedCookies: res.signedCookies,
            httpVersion: res.httpVersion,
            method: res.method,
            body: body,
            query: res.query,
            parameters: res.params
        }
    };

    functions.logger.debug({ log });
};

exports.saveReqRes = saveReqRes
