const { RabbitConnection } = require('../utils/rabbitmqConnection');
const faker = require('faker')

const produceRun = async () => {
    const rabbitMQ = new RabbitConnection('amqp://localhost:5672');
    for (let index = 0; index < 100; index++) {
        const person = {
            name: faker.name.firstName()
        }
        rabbitMQ.publishInQueue('hello', JSON.stringify(person));
    }
};

produceRun();
