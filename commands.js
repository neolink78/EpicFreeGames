import 'dotenv/config';
import { InstallGlobalCommands } from './utils.js';

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

const GET_NEXT_FREE_GAMES_COMMAND = {
  name: 'nextfreegames',
  description: 'to check the current free games',
  type: 1,
}


const GET_HELP = {
  name: 'help',
  description: 'to see commands',
  type: 1,
}


const SET_LANGUAGE = {
  name: 'setlanguage',
  description: 'select your preferred language(feature coming soon !)',
  type: 1,
}

const ALL_COMMANDS = [TEST_COMMAND, GET_FREE_GAMES_COMMAND, GET_HELP, GET_NEXT_FREE_GAMES_COMMAND, SET_LANGUAGE];

InstallGlobalCommands(process.env.APP_ID, ALL_COMMANDS);