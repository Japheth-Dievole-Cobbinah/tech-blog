import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
  try {
    console.log('🔐 Incoming Authorization Header:', req.headers.authorization);

    const authHeader = req.headers.authorization;
    if (!authHeader) {
      console.log('❌ No Authorization header found');
      return res.status(401).json({ message: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      console.log('❌ Token format invalid');
      return res.status(401).json({ message: 'Invalid token format' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('✅ Token verified successfully. Payload:', decoded);

    req.user = decoded;
    next();
  } catch (error) {
    console.error('❌ JWT verification failed:', error.message);
    res.status(401).json({ message: 'Unauthorized', error: error.message });
  }
};

export default auth;
