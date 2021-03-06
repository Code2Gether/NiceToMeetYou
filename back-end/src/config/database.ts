import mongoose from 'mongoose';
const db = mongoose.connection;

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
});

db.once('connected', () => {
    console.log(`Connected to MongoDB ${db.name} at ${db.host}:${db.port}`);
});
