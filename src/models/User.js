const { PrismaClient } = require('../generated/client');
const prisma = new PrismaClient();

const userModel = {
    createUser: async ({ name, email, password }) => {
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        });

        return user;
    },

    findUserByEmail: async (email) => {
        const user = await prisma.user.findUnique({
            where: { email },
        });

        return user;
    },
};

module.exports = userModel;
