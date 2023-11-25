import { LoremIpsum } from "lorem-ipsum";
import { Todo } from "@/models";

const NOTES_FIXTURES: Array<Todo> = [];

const lorem = new LoremIpsum({
  wordsPerSentence: {
    max: 16,
    min: 4,
  },
});

for (let i = 0; i < 10; i++) {
  NOTES_FIXTURES.push({
    id: i.toString(),
    content: lorem.generateWords(Math.round(Math.random() * 10) + 2),
    done: false,
  });
}

export default NOTES_FIXTURES;
