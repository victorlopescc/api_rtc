const { PrismaClient } = require('../generated/client');
const prisma = new PrismaClient();

const participantModel = {
    addParticipant: async ({ name, email, eventId }) => {
        const participant = await prisma.participant.create({
            data: {
                name,
                email,
                eventId,
            },
        });

        return participant;
    },
};

module.exports = participantModel;
