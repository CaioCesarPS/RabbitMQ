const { RabbitConnection } = require('../utils/rabbitmqConnection');

const consumerRun = async () => {
    const rabbitMQ = new RabbitConnection('amqp://localhost:5672');
    rabbitMQ.readFromQueue('hello');
};

consumerRun();