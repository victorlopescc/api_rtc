const { PrismaClient } = require('../generated/client');
const prisma = new PrismaClient();

const eventModel = {
    createEvent: async ({ title, datetime, duration, organizerId }) => {
        const event = await prisma.event.create({
            data: {
                title,
                datetime,
                duration,
                organizerId,
            },
        });

        return event;
    },

    findEventParticipants: async (eventId) => {
        const participants = await prisma.participant.findMany({
            where: {
                eventId,
            },
            select: {
                name: true,
                email: true,
            },
        });

        return participants;
    },
};

module.exports = eventModel;
