import { Kafka } from "kafkajs";

const kafka = new Kafka({
    clientId: "analytic-service",
    brokers: ["localhost:9094"]
})

//sinse we can create a multple consumer for same topic
//so we use groupId to identify the consumer
const consumer = kafka.consumer({ groupId: "analytic-service" });


const run = async () => {
    //connect to kafka
    await consumer.connect();
    //subscribe to topic
    await consumer.subscribe({ topic: "payment-successful", fromBeginning: true });
    //run consumer
    console.log("Analytic constumer started");
    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            const value = message.value.toString();
            const { userId, cart } = JSON.parse(value);

            const total = cart.reduce((acc, item) => acc + item.price, 0);
            console.log(`Analaytic constumer: User ${userId} made a purchase of ${total}`);
        },
    });
}

run().catch(console.error);
