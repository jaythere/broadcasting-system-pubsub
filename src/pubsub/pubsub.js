/**
 * Broadcasting system - Allows register as many as number of topics & subscriber
 * It has ability to subscribe/unsubscribe, publish a message, pause a topic.
 * ability to allow subscriber to pause, resume message.
 */

class BroadcasingSystem {
  constructor() {
    // topics initialization on creation of object
    this.topics = {};
  }

  // method to subscribe to topic
  subscribe = (subscriber, topic, cb) => {
    // initialization for new subscriber
    const newSubscriber = {
      [subscriber]: {
        subscriber,
        topic,
        status: "active",
        cb,
      },
    };

    // checking for topic to exist if yes then add subscriber to it
    // otherwise create a new one
    const existingTopic = this.topics[topic];
    if (existingTopic) {
      // adding subscriber to existing topic
      this.topics[topic]["subscriber"] = {
        ...newSubscriber,
        ...existingTopic.subscriber,
      };
    } else {
      // registering subscriber to new topic
      this.topics[topic] = {
        status: "resume",
        subscriber: newSubscriber,
      };
    }
  };

  // method to unsubscribe to topic
  unsubscribe = (subscriber, topicName) => {
    const subscribers = this.topics[topicName]?.subscriber;
    delete subscribers[subscriber];
  };

  // publish a message to subscriber to register to particular topic
  publish = (topicName, message) => {
    const topic = this.topics[topicName];
    const subscribers = topic?.subscriber;
    // checking for topic status before publishing message
    if (topic?.status === "resume" && subscribers) {
      for (let subscriber in subscribers) {
        if (subscribers[subscriber].status !== "pause")
          subscribers[subscriber].cb.call(this, message);
      }
    }
  };

  // method to allow ability to pause on topic
  pauseOnTopic = (topicName) => {
    if (this.topics[topicName]) {
      this.topics[topicName]["status"] = "pause";
    }
  };

  // method to allow ability to resume on topic
  resumeOnTopic = (topicName, message) => {
    if (this.topics[topicName]) {
      this.topics[topicName]["status"] = "resume";
    }
    // publishing messages once it get unpaused
    this.publish(topicName, message);
  };

  // method to allow ability to subscriber pause
  pauseOnSubscriber = (subscriberName, topicName) => {
    const existingSubscriber =
      this.topics?.[topicName]?.["subscriber"]?.[subscriberName];
    // additional check before update status of subscriber
    if (existingSubscriber) {
      existingSubscriber.status = "pause";
    }
  };

  // method to allow ability to subscriber resume
  resumeOnSubscriber = (subscriberName, topicName) => {
    const existingSubscriber =
      this.topics?.[topicName]?.["subscriber"]?.[subscriberName];
    // additional check before update status of subscriber
    if (existingSubscriber) {
      existingSubscriber.status = "resume";
    }
  };

  getSubscribers = () => {
    return this.topics;
  };
}

const pubsub = new BroadcasingSystem();

export { pubsub };
