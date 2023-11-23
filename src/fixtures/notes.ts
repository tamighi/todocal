import { LoremIpsum } from "lorem-ipsum";
import { Note } from "../models";

const NOTES_FIXTURES: Array<Note> = [];

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4,
  },
  wordsPerSentence: {
    max: 16,
    min: 4,
  },
});

for (let i = 0; i < 10; i++) {
  NOTES_FIXTURES.push({
    id: i.toString(),
    title: lorem.generateWords(Math.round(Math.random() * 10) + 2),
    body: lorem.generateSentences(Math.round(Math.random() * 3) + 1),
  });
}

export default NOTES_FIXTURES;
