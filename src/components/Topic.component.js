import React, { Fragment, useContext, useState } from "react";
import { Context } from "../Context";
import { pubsub } from "../pubsub/pubsub";
let topicCount = 1;

const Topic = () => {
  const { state, setState } = useContext(Context);
  const [topicStatus, setTopicStatus] = useState({});
  const [message, setMessage] = useState({});
  const { topics = [] } = state;

  const addTopics = () => {
    setState({
      ...state,
      topics: [...topics, `Topic ${topicCount++}`],
    });
  };

  const setTopicMessage = (e, topic) => {
    setMessage({
      ...message,
      [topic]: e.currentTarget.value,
    });
  };

  const toggleTopicStatus = (topic, status) => {
    setTopicStatus({ ...topicStatus, [topic]: status });
    if (status === "pause") {
      pubsub.resumeOnTopic(topic, message[topic]);
    } else {
      pubsub.pauseOnTopic(topic);
    }
  };

  const publishEvent = (topic) => {
    pubsub.publish(topic, message[topic]);
  };

  return (
    <>
      {topics.map((topic) => {
        return (
          <div key={topic} className="topic_wrapper">
            <div className="topic">{topic}</div>
            {topicStatus[topic] === "resume" ? (
              <button
                className="publish_btn"
                onClick={() => toggleTopicStatus(topic, "pause")}
              >
                Restart
              </button>
            ) : (
              <button
                className="publish_btn"
                onClick={() => toggleTopicStatus(topic, "resume")}
              >
                Set Pause
              </button>
            )}
            <input
              type="text"
              value={message[topic] || ""}
              onChange={(e) => setTopicMessage(e, topic)}
              placeholder="Type message here"
            />
            <button className="publish_btn" onClick={() => publishEvent(topic)}>
              Publish
            </button>
          </div>
        );
      })}
      <button className="topic_btn" onClick={addTopics}>
        Add Topics
      </button>
    </>
  );
};

export default Topic;
