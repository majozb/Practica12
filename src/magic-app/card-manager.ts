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
   * @brief Método que valida los atributos de la carta
   * @param card - Carta a validar
   * @returns Devuelve un mensaje de éxito o error
   */
  public validation(card): string {
    if (!Object.keys(ColorEnum).includes(card.Color as ColorEnum)) {
      return ('Invalid color');
    }
    if (!Object.keys(Rareza).includes(card.Rareza)) {
      return ('Invalid rarity');
    }
    if (!Object.keys(LineaDeTipo).includes(card.Linea_tipo)) {
      return ('Invalid type');
    }
    if (card.ID < 0 || Number.isInteger(card.ID) !== true) {
      return ('Invalid ID');
    }
    if (card.Linea_tipo === 'planeswalker' && card.Lealtad === undefined) {
      return ('Planeswalker card must have loyalty');
    }
    if (card.Linea_tipo === 'criatura' && (card.Fuerza === undefined || card.Resistencia === undefined)) {
      return ('Creature card must have power and toughness');
    }
    if (card.Linea_tipo !== 'planeswalker' && card.Lealtad !== undefined) {
      return ('Only Planeswalker card can have loyalty');
    }
    if (card.Linea_tipo !== 'criatura' && (card.Fuerza !== undefined || card.Resistencia !== undefined)) {
      return ('Only Creature card can have power and toughness');
    }

    return "Card is valid!";
  }

  /**
   * @brief Método que añade una carta a la colección
   * @param user - Nombre del usuario
   * @param card - Carta a añadir
   * @param callback - Función de retorno
   * @returns Devuelve un mensaje de éxito o error
   */
  addCard(user, card, callback) {
    const validationResult = this.validation(card);
    if (validationResult !== "Card is valid!") {
      callback(validationResult);
      return;
    }
  
    const filePath = `cards/${user}/${card.ID}.json`;
  
    fs.access(filePath, (err) => {
      if (err) {
        fs.mkdir(`cards/${user}/`, { recursive: true }, (err) => {
          if (err) {
            callback('Error creating user collection!');
          } else {
            fs.writeFile(filePath, JSON.stringify(card, null, 2), (err) => {
              if (err) {
                callback('Error adding card to collection!');
              } else {
                callback(null, 'New collection created with card added!');
              }
            });
          }
        });
      } else {
        callback(`Card already exists at ${user} collection!`);
      }
    });
  }
  
  /**
   * @brief Método que actualiza una carta en la colección
   * @param user - Nombre del usuario
   * @param card - Carta a actualizar
   * @param callback - Función de retorno
   * @returns Devuelve un mensaje de éxito o error
   */
  updateCard(user: string , card, callback) {
    if (this.validation(card) !== "Card is valid!") {
      callback(this.validation(card));
      return;
    }

    const directoryPath = `cards/${user}`;
    const filePath = `cards/${user}/${card.ID}.json`;

    fs.access(directoryPath, (err) => {
      if (err) {
        callback(`User: ${user} not found!`);
      } else {
        fs.access(filePath, (err) => {
          if (err) {
            callback(`Card not found at ${user} collection!`);
          } else {
            fs.unlink(filePath, (err) => {
              if (err) {
                callback(`Error updating card from ${user} collection!`);
              } else {
                fs.writeFile(filePath, JSON.stringify(card, null, 2), (err) => {
                  if (err) {
                    callback(`Error updating card from ${user} collection!`);
                  } else {
                    callback(null, `Card updated at ${user} collection!`);
                  }
                });
              }
            });
          }
        });
      }
    });
  }
  
  /**
   * @brief Método que elimina una carta de la colección
   * @param user - Nombre del usuario
   * @param card - Carta a eliminar
   * @param callback - Función de retorno
   * @returns Devuelve un mensaje de éxito o error
   */
  removeCard(user: string, card, callback) {
    const filePath = `cards/${user}/${card}.json`;
  
    fs.access(filePath, (err) => {
      if (err) {
        callback(`Card not found at ${user} collection!`, 404);
      } else {
        fs.unlink(filePath, (err) => {
          if (err) {
            callback(`Error removing card from ${user} collection!`, 500);
          } else {
            callback(null, `Card removed from ${user} collection!`);
          }
        });
      }
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
        callback(`Error reading user collection: ${err}`);
      } else {
        result += 'User collection found!\n';
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
        callback(`Card not found at ${user} collection!`);
      } else {
        fs.readFile(filePath, 'utf-8', (err, data) => {
          if (err) {
            callback('Error reading file.');
          } else {
            const carta = JSON.parse(data);
            let result = `Card found in collection!\n`;
  
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
