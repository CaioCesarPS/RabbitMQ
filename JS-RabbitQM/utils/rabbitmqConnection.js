const amqp = require('amqplib/callback_api');

class RabbitConnection {
  url;
  constructor(url) {
    this.url = url;
  }

  async publishInQueue(queue, message) {
    return await amqp.connect(this.url, (error0, connection) => {
      this.rabbitConnectProducer(queue, error0, connection, message);
      return this.rabbitCloseConnection(connection);
    });
  }

  async readFromQueue(queue) {
    return await amqp.connect(this.url, (error0, connection) => {
      this.rabbitConnectConsumer(queue, error0, connection);
    })
  }

  rabbitConnectProducer(queue, error0, connection, message) {
    if (error0) {
      throw error0;
    }
    connection.createChannel((error1, channel) => {
      if (error1) {
        throw error1;
      }

      channel.assertQueue(queue, {
        durable: false,
      });
      channel.sendToQueue(queue, Buffer.from(message));

      return console.log(' [x] Sent %s', message);
    });
  }

  rabbitConnectConsumer(queue, error0, connection) {
    if (error0) {
      throw error0;
    }
    connection.createChannel(function(error1, channel) {
      if (error1) {
        throw error1;
      }
  
      channel.assertQueue(queue, {
        durable: false
      });

      console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

      channel.consume(queue, function(msg) {
          console.log(" [x] Received %s", msg.content.toString());
      }, {
          noAck: true
      });
    });
  }

  rabbitCloseConnection(connection) {
    return setTimeout(function () {
      connection.close();
      process.exit(0);
    }, 500);
  }
}

module.exports = {
  RabbitConnection,
};
