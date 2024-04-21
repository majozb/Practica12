import chalk from 'chalk';
import fs from 'fs';
import { ColorEnum, Rareza, LineaDeTipo } from './enumerados.js';

/**
 * @brief Clase que gestiona las cartas
 */
export class CardManager {
  /**
   * @brief Atributo que almacena la instancia de CardManager
   */
  private static instance: CardManager;

  /**
   * @brief Constructor de la clase CardManager
   */
  private constructor() {}

  /**
   * @brief Método que devuelve la instancia de CardManager
   * @returns CardManager
   */
  public static getInstance() {
    if (!CardManager.instance) {
      CardManager.instance = new CardManager();
    }
    return CardManager.instance;
  }

  /**
   * @brief Método que añade una carta a la colección
   * @param user - Nombre del usuario
   * @param card - Carta a añadir
   * @returns Devuelve un mensaje de éxito o error
   */
  addCardPr(user: string, card) {
    return new Promise<string>((resolve, reject) => {

      const filePath = `cards/${user}/${card.ID}.json`;

      fs.promises.access(filePath)
      .then(() => {
        reject(`${chalk.red(`Card already exists at ${user} collection!`)}`);
      })
      .catch(() => {
        return fs.promises.mkdir(`cards/${user}/`, { recursive: true });
      })
      .then(() => {
        return fs.promises.writeFile(filePath, JSON.stringify(card, null, 2));
      })
      .then(() => {
        resolve(`${chalk.green('New collection created with card added!')}`);
      })
      .catch(() => {
        reject(`${chalk.red('Error adding card to collection!')}`);
      });
    });
  }
  
  
  /**
   * @brief Método que elimina una carta de la colección
   * @param user - Nombre del usuario
   * @param cardId - ID de carta a eliminar
   * @returns Devuelve un mensaje de éxito o error
   */
  removeCardPr(user: string, cardId) {
    return new Promise<string>((resolve, reject) => {
      const filePath = `cards/${user}/${cardId}.json`;
      fs.promises.access(filePath)
      .then(() => {
        return fs.promises.unlink(filePath)
      })
      .catch((err) => {
        reject(`${chalk.red(`Card not found at ${user} collection!`)}`);
      })
      .then(() => {
        resolve(`${chalk.green(`Card removed from ${user} collection!`)}`);
      })
      .catch((err) => {
        reject(`Error removing card from ${user} collection! ${err.message}`);
      });
    });
  }
  
  /**
   * @brief Método que lista todas las cartas de la colección
   * @param user - Nombre del usuario
   * @param callback - Función de retorno
   * @returns Devuelve un mensaje de éxito o error
   */
  listCards(user, callback) {
    let result = '';
    const directoryPath = `cards/${user}`;
  
    fs.readdir(directoryPath, (err, userCollection) => {
      if (err) {
        callback(`${chalk.red(`Error reading user collection: ${err}`)}`);
      } else {
        result += `${chalk.green('User collection found!')}\n`;
        result += '-------------------\n';
        userCollection.forEach((card) => {
          const filePath = `cards/${user}/${card}`;
          const data = fs.readFileSync(filePath, 'utf-8');
          const carta = JSON.parse(data);
  
          for (const [key, value] of Object.entries(carta)) {
            result += `${key}: ${value}\n`;
          }
          result += '-------------------\n';
        });
        callback(null, result);
      }
    });
  }
  
  /**
   * @brief Método que muestra la información de una carta
   * @param user - Nombre del usuario
   * @param cardId - ID de la carta
   * @param callback - Función de retorno
   * @returns Devuelve la información de la carta o un mensaje de error
   */
  readCard(user :string, cardId, callback) {
    const filePath = `cards/${user}/${cardId}.json`;
    
    fs.access(filePath, (err) => {
      if (err) {
        callback(`${chalk.red(`Card not found at ${user} collection!`)}`);
      } else {
        fs.readFile(filePath, 'utf-8', (err, data) => {
          if (err) {
            callback('Error reading file.');
          } else {
            const carta = JSON.parse(data);
            let result = `${chalk.green('Card found in collection!')}\n`;
  
            for (const [key, value] of Object.entries(carta)) {
              result += `${key}: ${value}\n`;
            }
            callback(null, result);
          }
        });
      }
    });
  }
}
