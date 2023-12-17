const { PrismaClient } = require('../models');
const prisma = new PrismaClient();

const EventController = {
    create: async (req, res) => {
        // TODO: Implementar lógica de criação de evento
    },

    list: async (req, res) => {
        // TODO: Implementar lógica de listagem de eventos
    },

    getById: async (req, res) => {
        // TODO: Implementar lógica de obtenção de um evento por ID
    },
};

module.exports = EventController;
