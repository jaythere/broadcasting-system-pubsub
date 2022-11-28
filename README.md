# Broadcasting System

## Problem Statement

Publish/Subscribe Implementation Question: Create a broadcasting system for a list of topics which can publish messages. And allow any subscribers to subscribe and consume the message. Ex: Topics: [Cricket, Football, Hockey…] Subscribers [S1, S2, S3,…]. Note: The subscriber should also have the ability to unsubscribe from a particular topic. P2: How will you implement a scenario of Pause & Restart on a topic. When a Topic is paused it should still receive any messages that are sent. But should not publish it to its subscribers until restarted P3: How can a subscriber pause messages for a duration of time.

## Solution - src/pubsub/pubsub.js

Follow below steps to run the project and see the solutions. To Demonstrate the solution I've used React to Build UI and JavaScript for business logic(pubsub.js).

In the project directory, you can run:

### `npm install`

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

## demo



https://user-images.githubusercontent.com/8495058/204253782-07af8662-9a59-46a1-b277-1073cce7d0f4.mp4

