import mongoose, {mongo} from "mongoose";

async function conectarDatabase() {
    mongoose.connect("mongodb+srv://admin:admin123@cluster0.aexdcei.mongodb.net/lojaHardware?retryWrites=true&w=majority");
    return mongoose.connection;
}

export default conectarDatabase;