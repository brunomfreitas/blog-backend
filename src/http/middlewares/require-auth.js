"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = requireAuth;
// src/http/middlewares/require-auth.ts
var jwt_1 = require("@/lib/auth/jwt");
function requireAuth(req, res, next) {
    var header = req.headers.authorization || '';
    var _a = header.split(' '), token = _a[1];
    if (!token)
        return res.status(401).json({ message: 'Missing token' });
    try {
        var payload = (0, jwt_1.verifyToken)(token);
        req.user = payload; // { sub, pid, login }
        return next();
    }
    catch (_b) {
        return res.status(401).json({ message: 'Invalid token' });
    }
}
