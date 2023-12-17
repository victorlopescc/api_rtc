const { PrismaClient } = require('../models');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authMiddleware = require('../utils/authMiddleware');

const UserController = {
    register: async (req, res) => {
        try {
            const { name, email, password } = req.body;

            const hashedPassword = await bcrypt.hash(password, 10);

            const user = await prisma.user.create({
                data: {
                    name,
                    email,
                    password: hashedPassword,
                },
            });

            return res.status(201).json({ user });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    },

    login: async (req, res) => {
        try {
            const { email, password } = req.body;

            const user = await prisma.user.findUnique({
                where: { email },
            });

            if (!user || !(await bcrypt.compare(password, user.password))) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }

            const token = jwt.sign({ userId: user.id }, 'your-secret-key', {
                expiresIn: '1h',
            });

            await prisma.user.update({
                where: { id: user.id },
                data: { token },
            });

            return res.json({ token });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    },

    protectedRoute: async (req, res) => {
        return res.json({ message: 'This is a protected route' });
    },

    protectedRouteWithMiddleware: [authMiddleware, async (req, res) => {
        return res.json({ message: 'This is a protected route with middleware' });
    }],
};

module.exports = UserController;
