const { PrismaClient } = require('../models');
const prisma = new PrismaClient();

const authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ error: 'Token not provided' });
    }

    try {
        const user = await prisma.user.findUnique({
            where: { token },
        });

        if (!user) {
            return res.status(401).json({ error: 'Invalid token' });
        }

        req.user = user;
        return next();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = authMiddleware;
