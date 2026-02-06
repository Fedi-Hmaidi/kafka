import { Engine } from 'bpmn-engine';
import fs from 'fs';
import { EventEmitter } from 'events';
import { Kafka } from 'kafkajs';

const source = fs.readFileSync('./process.bpmn', 'utf-8');

const kafka = new Kafka({
    clientId: 'bpmn-engine',
    brokers: ['localhost:9094'],
});
const producer = kafka.producer();

const engine = new Engine({
    name: 'Payment Process Execution',
    source
});

const listener = new EventEmitter();

listener.on('start', () => console.log('🚀 [Engine]: Process Started'));
listener.on('end', () => console.log('🏁 [Engine]: Process Finished'));
listener.on('activity.start', (element) => {
    if (element.id === 'Event_KafkaPublish') {
        console.log(`🟧 [Kafka]: Preparing to publish event '${element.name}'...`);
    }
});

const services = {
    paymentService: (context, next) => {
        console.log('🟪 [Payment Service]: Processing payment...');
        setTimeout(() => {
            console.log('🟪 [Payment Service]: Payment Authorized.');
            next();
        }, 500);
    },
    analyticService: (context, next) => {
        console.log('🟩 [Analytic Service]: Logging transaction data...');
        console.log('🟩 [Analytic Service]: 📊 Dashboard Updated.');
        next();
    }
};

async function runProcess() {
    await producer.connect();

    listener.on('activity.start', async (element) => {
        if (element.id === 'Event_KafkaPublish') {
            const payload = {
                userId: 123,
                cart: [{ price: 50 }, { price: 20 }]
            };
            await producer.send({
                topic: 'payment-successful',
                messages: [{ value: JSON.stringify(payload) }]
            });
            console.log(`🟧 [Kafka]: Published 'payment-successful' event`);
        }
    });

    engine.execute({ listener, services });
}

runProcess().catch(err => console.error(err));
