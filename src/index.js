const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

const authRoutes = require('./routes/authRoutes');
const eventRoutes = require('./routes/eventRoutes');
const participantRoutes = require('./routes/participantRoutes');

app.use('/auth', authRoutes);
app.use('/event', eventRoutes);
app.use('/participant', participantRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
