import { Kafka } from "kafkajs";


/*
clientId → name of your app (shows in Kafka logs & monitoring tools like AKHQ)

brokers → where Kafka is running

localhost:9094 = Kafka broker exposed on port 9094

This matches your EXTERNAL listener


“Hey Kafka, I’m kafka-service, and I want to connect to you at localhost:9094.”
*/
const kafka = new Kafka({
    clientId: "kafka-service",
    brokers: ["localhost:9094"]
})


/*

Kafka has roles:

Producer → sends messages

Consumer → reads messages

Admin → manages Kafka itself (topics, partitions, configs)
*/
const admin = kafka.admin();

async function run() {
    await admin.connect();
    await admin.createTopics({
        topics: [
            {
                topic: "payment-successful",
                numPartitions: 1
            },

            {
                topic: "order-successful",
                numPartitions: 1
            }
        ]
    })
    await admin.disconnect();
}

run().catch(console.error);