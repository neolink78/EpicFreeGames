import 'dotenv/config';
import { InstallGlobalCommands } from './utils.js';

// Get the game choices from game.js
/*function createCommandChoices() {
  const choices = getRPSChoices();
  const commandChoices = [];

  for (let choice of choices) {
    commandChoices.push({
      name: capitalize(choice),
      value: choice.toLowerCase(),
    });
  }

  return commandChoices;
}*/

// Simple test command
const TEST_COMMAND = {
  name: 'test',
  description: 'what a test !',
  type: 1,
};

const GET_FREE_GAMES_COMMAND = {
  name: 'freegames',
  description: 'to check the current free games',
  type: 1,
}


// Command containing options
/*const CHALLENGE_COMMAND = {
  name: 'challenge',
  description: 'Challenge to a match of rock paper scissors',
  options: [
    {
      type: 3,
      name: 'object',
      description: 'Pick your object',
      required: true,
      choices: createCommandChoices(),
    },
  ],
  type: 1,
};*/

const ALL_COMMANDS = [TEST_COMMAND, GET_FREE_GAMES_COMMAND];

InstallGlobalCommands(process.env.APP_ID, ALL_COMMANDS);