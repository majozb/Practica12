import { CommandBuilder } from "yargs";
import { ColorEnum, LineaDeTipo, Rareza } from "./enumerados.js";
/**
 * @brief Builder con las opciones de cartas que se usaran en agregar y actualizar
 */
export const builder: CommandBuilder = {
  user: {
    describe: 'Username',
    type: 'string',
    demandOption: true
  },
  id : {
    describe: 'Card ID',
    type: 'number',
    demandOption: true
  },
  name : {
    describe: 'Card name',
    type: 'string',
    demandOption: true
  },
  coste_mana : {
    describe: 'Card mana cost',
    type: 'number',
    demandOption: true
  },
  color : {
    describe: 'Card color',
    type: 'string',
    demandOption: true,
    choices: Object.keys(ColorEnum)
  },
  linea_tipo : {
    describe: 'Card type',
    type: 'string',
    demandOption: true,
    choices: Object.keys(LineaDeTipo)
  },
  rareza : {
    describe: 'Card rarity',
    type: 'string',
    demandOption: true,
    choices: Object.keys(Rareza)
  },
  reglas : {
    describe: 'Card rules',
    type: 'string',
    demandOption: true
  },
  fuerza : {
    describe: 'Card power',
    type: 'number',
    demandOption: false
  },
  resistencia : {
    describe: 'Card toughness',
    type: 'number',
    demandOption: false
  },
  lealtad : {
    describe: 'Card loyalty',
    type: 'number',
    demandOption: false
  },
  coste : {
    describe: 'Card cost',
    type: 'number',
    demandOption: true
  }
};