const { PrismaClient } = require('../generated/client');
const prisma = new PrismaClient();

const participantController = {
    addParticipant: async (req, res) => {
        const { name, email, eventId } = req.body;

        try {
            const participant = await prisma.participant.create({
                data: {
                    name,
                    email,
                    eventId,
                },
            });

            res.status(201).json({ participantId: participant.id, name: participant.name });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error adding participant to the event.' });
        }
    },
};

module.exports = participantController;
