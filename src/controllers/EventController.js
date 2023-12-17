const { PrismaClient } = require('../generated/client');
const prisma = new PrismaClient();

const eventController = {
    createEvent: async (req, res) => {
        const { title, datetime, duration, organizerId } = req.body;

        try {
            const event = await prisma.event.create({
                data: {
                    title,
                    datetime,
                    duration,
                    organizerId,
                },
            });

            res.status(201).json({ eventId: event.id, title: event.title });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error creating event.' });
        }
    },

    getEventParticipants: async (req, res) => {
        const eventId = parseInt(req.params.eventId);

        try {
            const participants = await prisma.participant.findMany({
                where: {
                    eventId,
                },
                select: {
                    name: true,
                    email: true,
                },
            });

            res.json(participants);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error getting event participants.' });
        }
    },
};

module.exports = eventController;
