const { PrismaClient } = require('../generated/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');

const authController = {
    register: async (req, res) => {
        const { name, email, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        try {
            const user = await prisma.user.create({
                data: {
                    name,
                    email,
                    password: hashedPassword,
                },
            });

            res.status(201).json({ userId: user.id, email: user.email });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error registering user.' });
        }
    },

    login: async (req, res) => {
        const { email, password } = req.body;

        try {
            const user = await prisma.user.findUnique({
                where: { email },
            });

            if (!user) {
                return res.status(404).json({ error: 'User not found.' });
            }

            const passwordMatch = await bcrypt.compare(password, user.password);

            if (passwordMatch) {
                res.json({ success: true, userId: user.id, email: user.email });
            } else {
                res.json({ success: false, error: 'Invalid password.' });
            }

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error logging in.' });
        }
    },
};

module.exports = authController;
