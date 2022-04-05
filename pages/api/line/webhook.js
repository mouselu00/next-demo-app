import * as line from "@line/bot-sdk";

const config = {
  channelAccessToken:
    "M3xQEoQnZrv5gUIEUMwhhjxnQIweygXZGhJvK6Olitc3NRQkwHCuIgQmqA1xih/MedN0W2XMvfaDvc8TRxcWfcoQ9q5/xYVsOjy5IQx47zBVgNl7UKdo7tjLz9sr14u5LJ8T5LwAEnvnmviLJ2AduwdB04t89/1O/w1cDnyilFU=",
  channelSecret: "f3902de31c7b592e70cd77a9d0353b5f",
};

const client = new line.Client(config);
export default function webhook(req, res) {
  if (req.method === "POST") {
    line.middleware(config);
    Promise.all(req.body.events.map(handleEvent)).then((result) =>
      res.json(result)
    );
  }
}
function handleEvent(event) {
  if (event.type !== "message" || event.message.type !== "text") {
    return Promise.resolve(null);
  }

  return client.replyMessage(event.replyToken, {
    type: "text",
    text: `${event.message.text}!!!!!`,
  });
}
