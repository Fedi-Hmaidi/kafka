import cors from "cors";
import express from "express";
import { Kafka } from "kafkajs";

const app = express();




app.use(cors({
    origin: "http://localhost:3000"
}));

app.use(express.json());

const kafka = new Kafka({
    clientId: "payment-service",
    brokers: ["localhost:9094"]
})

const producer = kafka.producer();

const connetToKafka = async () => {
    try {
        await producer.connect();
        console.log("producer connected");
    } catch (error) {
        console.error("Error connecting to Kafka:", error);
    }
}





app.post("/payment-service", async (req, res) => {
    const { cart } = req.body;
    const userId = "123"

    //todo:payment

    //kafka
    //send message to payment success topic
    await producer.send({
        topic: "payment-successful",
        messages: [
            { value: JSON.stringify({ cart, userId }) }
        ]
    })

    return res.status(200).json({ message: "Payment successful" });
})

app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message });
})

app.listen(8000, () => {
    connetToKafka();
    console.log(`Server is running on port 8000`);
});
