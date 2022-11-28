import React, { useContext, useState } from "react";
import { Context } from "../Context";
import { pubsub } from "../pubsub/pubsub";

let subscriberCount = 1;
const Subscriber = () => {
  const { state, setState } = useContext(Context);
  const { subscribers = [], topics = [] } = state;
  const [selectedTopic, setSelectedTopic] = useState({});
  const [subscriptionStatus, setSubscriptionStatus] = useState({});
  const [activeStatus, setStatus] = useState({});

  const addSubscribers = () => {
    setState({
      ...state,
      subscribers: [...subscribers, `Subscriber ${subscriberCount++}`],
    });
  };

  const handleChange = (e, subscriber) => {
    setSelectedTopic({
      ...selectedTopic,
      [subscriber]: e.target.value,
    });
  };

  const pauseSubscription = (subscriber) => {
    pubsub.pauseOnSubscriber(
      subscriber,
      selectedTopic[subscriber] || topics[0]
    );
    setStatus({
      ...activeStatus,
      [`${subscriber}-${selectedTopic[subscriber] || topics[0]}`]: "active",
    });
  };

  const resumeSubscription = (subscriber) => {
    pubsub.resumeOnSubscriber(
      subscriber,
      selectedTopic[subscriber] || topics[0]
    );
    setStatus({
      ...activeStatus,
      [`${subscriber}-${selectedTopic[subscriber] || topics[0]}`]: null,
    });
  };

  const subscribeEvent = (subscriber) => {
    console.log(
      `${subscriber} subscribe to topic ${
        selectedTopic[subscriber] || topics[0]
      }`
    );
    pubsub.subscribe(
      subscriber,
      selectedTopic[subscriber] || topics[0],
      (publisher) => {
        console.log(
          `Event Published - Subscriber Notified - Topic Name: ${
            selectedTopic[subscriber] || topics[0]
          }, Subscriber: ${subscriber}, Message from publisher: ${publisher}`
        );
      }
    );
    setSubscriptionStatus({
      ...subscriptionStatus,
      [`${subscriber}-${selectedTopic[subscriber] || topics[0]}`]: "subscribed",
    });
  };

  const unsubscribeEvent = (subscriber) => {
    console.log(
      `${subscriber} unsubscribe to topic ${
        selectedTopic[subscriber] || topics[0]
      }`
    );
    pubsub.unsubscribe(subscriber, selectedTopic[subscriber] || topics[0]);
    setSubscriptionStatus({
      ...subscriptionStatus,
      [`${subscriber}-${selectedTopic[subscriber] || topics[0]}`]: null,
    });
  };

  return (
    <div className="subscribers">
      {subscribers.map((subscriber, sIndex) => {
        return (
          <div key={subscriber} className="subscriber">
            <div className="subscriber_title">{subscriber}</div>
            {!!topics.length && (
              <div>
                <select
                  value={selectedTopic[subscriber] || ""}
                  onChange={(e) => handleChange(e, subscriber)}
                >
                  {topics.map((topic, index) => {
                    return (
                      <option
                        key={`subscriber-topic-${index}-${sIndex}`}
                        value={topic}
                      >
                        {topic}
                      </option>
                    );
                  })}
                </select>
                {subscriptionStatus[
                  `${subscriber}-${selectedTopic[subscriber] || topics[0]}`
                ] ? (
                  <button
                    className="publish_btn"
                    onClick={() => unsubscribeEvent(subscriber)}
                  >
                    Unsubscribe
                  </button>
                ) : (
                  <button
                    className="publish_btn"
                    onClick={() => subscribeEvent(subscriber)}
                  >
                    Subscribe
                  </button>
                )}
                {activeStatus[
                  `${subscriber}-${selectedTopic[subscriber] || topics[0]}`
                ] ? (
                  <button
                    className="publish_btn"
                    onClick={() => resumeSubscription(subscriber)}
                  >
                    Resume
                  </button>
                ) : (
                  <button
                    className="publish_btn"
                    onClick={() => pauseSubscription(subscriber)}
                  >
                    Pause
                  </button>
                )}
              </div>
            )}
          </div>
        );
      })}
      <button className="subscriber_btn" onClick={addSubscribers}>
        Add Subscribers
      </button>
    </div>
  );
};

export default Subscriber;
