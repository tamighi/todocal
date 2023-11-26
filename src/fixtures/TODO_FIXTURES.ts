import { LoremIpsum } from "lorem-ipsum";
import { Todo } from "@/models";

const TODO_FIXTURES: Array<Todo> = [];

const lorem = new LoremIpsum({
  wordsPerSentence: {
    max: 16,
    min: 4,
  },
});

for (let i = 0; i < 50; i++) {
  const randomDays = Math.round(Math.random() * 30);
  const randomDate = new Date(Date.now() + randomDays * 24 * 60 * 60 * 1000);

  TODO_FIXTURES.push({
    id: i.toString(),
    content: lorem.generateWords(Math.round(Math.random() * 10) + 2),
    done: false,
    dayId: randomDate.toISOString().split("T")[0],
  });
}

export default TODO_FIXTURES;
