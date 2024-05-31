
import  jwt from 'jsonwebtoken';
 const verifyToken=(req, res, next)=> {
const token = req.header('auth');
if (!token) return res.status(401).json({ error: 'Access denied please auth in header in token' });
try {
 const decoded = jwt.verify(token, process.env.JWT_SECREATE_KEY);
 req.userId = decoded.userId;
 next();
 } catch (error) {
 res.status(401).json({ error: 'Invalid token' });
 }
 };

 export { verifyToken};