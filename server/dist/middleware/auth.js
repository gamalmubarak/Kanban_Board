import jwt from 'jsonwebtoken';
export const authenticateToken = (req, res, next) => {
    // TODO: verify the token exists and add the user data to the request object
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Access token is missing or invalid' });
    }
    try {
        const secretKey = process.env.JWT_SECRET_KEY || '';
        const decoded = jwt.verify(token, secretKey);
        req.user = { username: decoded.username };
        next();
        return;
    }
    catch (error) {
        return res.status(403).json({ message: 'Invalid or expired token' });
    }
};
