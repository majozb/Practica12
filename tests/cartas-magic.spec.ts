import "mocha";
import { expect } from "chai";
import { CardManager } from "../src/magic-app/card-manager.js";

describe("CardManager", () => {
  const cardmanager = CardManager.getInstance();
  context("Pruebas en el usuario usuario1", () => {
    it("Agregar carta con id 1", (done) => {
      const card = {
        ID: 1,
        Name: "usuario1Card",
        Coste_mana: 1,
        Color: "azul",
        Linea_tipo: "criatura",
        Rareza: "comun",
        Reglas: "Flying",
        Fuerza: 1,
        Resistencia: 1,
        Coste: 1
      };
      cardmanager.addCard("usuario1", card, (_,data) => {
        expect(data).to.equal(`New collection created with card added!`);
        done();
      });
    });
    it("Actualizar la carta con id 1", (done) => {
      const card = {
        ID: 1,
        Name: "usuario1Card",
        Coste_mana: 1,
        Color: "verde",
        Linea_tipo: "criatura",
        Rareza: "comun",
        Reglas: "Flying",
        Fuerza: 1,
        Resistencia: 1,
        Coste: 1
      };
      cardmanager.updateCard("usuario1", card, (_, data) => {
        expect(data).to.equal('Card updated at usuario1 collection!');
        done();
      });
    });
    it("Agregar una carta ya existente", (done) => {
      const card = {
        ID: 1,
        Name: "usuario1Card",
        Coste_mana: 1,
        Color: "azul",
        Linea_tipo: "criatura",
        Rareza: "comun",
        Reglas: "Flying",
        Fuerza: 1,
        Resistencia: 1,
        Coste: 1
      };
      cardmanager.addCard("usuario1", card, (data) => {
        expect(data).to.equal(`Card already exists at usuario1 collection!`);
        done();
      });
    });
    it("Eliminar la carta 1", (done) => {
      cardmanager.removeCard("usuario1", 1, (_, data) => {
        expect(data).to.equal('Card removed from usuario1 collection!');
        done();
      });
    });
    it("Listar todas las cartas en la colección", (done) => {
      cardmanager.listCards("usuario1", (_, data) => {
        expect(data).to.equal('User collection found!\n-------------------\n');
        done();
      });
    });
    it("Leer una carta que no existe", (done) => {
      cardmanager.readCard("usuario1", 1, (data) => {
        expect(data).to.equal('Card not found at usuario1 collection!');
        done();
      });
    });
    it("Muestra todas las cartas de la coleccion", (done) => {
      cardmanager.listCards("usuario1", (_, data) => {
        expect(data).to.equal('User collection found!\n-------------------\n');
        done();
      });
    });
    it("Agregar una carta con un color no valido", (done) => {
      const card = {
        ID: 1,
        Name: "usuario1Card",
        Coste_mana: 1,
        Color: "amarillo",
        Linea_tipo: "criatura",
        Rareza: "comun",
        Reglas: "Flying",
        Coste: 1
      };
      cardmanager.addCard("usuario1", card, (data) => {
        expect(data).to.equal('Invalid color');
        done();
      });
    });
    it("Agregar una carta con una rareza no valida", (done) => {
      const card = {
        ID: 1,
        Name: "usuario1Card",
        Coste_mana: 1,
        Color: "azul",
        Linea_tipo: "criatura",
        Rareza: "interesante",
        Reglas: "Flying",
        Coste: 1
      };
      cardmanager.addCard("usuario1", card, (data) => {
        expect(data).to.equal('Invalid rarity');
        done();
      });
    });
    it("Agregar una carta con una linea de tipo no valida", (done) => {
      const card = {
        ID: 1,
        Name: "usuario1Card",
        Coste_mana: 1,
        Color: "azul",
        Linea_tipo: "tipo",
        Rareza: "comun",
        Reglas: "Flying",
        Coste: 1
      };
      cardmanager.addCard("usuario1", card, (data) => {
        expect(data).to.equal('Invalid type');
        done();
      });
    });
    it("Agregar una carta con un ID no valido", (done) => {
      const card = {
        ID: -1,
        Name: "usuario1Card",
        Coste_mana: 1,
        Color: "azul",
        Linea_tipo: "criatura",
        Rareza: "comun",
        Reglas: "Flying",
        Coste: 1
      };
      cardmanager.addCard("usuario1", card, (data) => {
        expect(data).to.equal('Invalid ID');
        done();
      });
    });
    it("Agregar una carta con id 2", (done) => {
      const card = {
        ID: 2,
        Name: "usuario1Card2",
        Coste_mana: 1,
        Color: "multicolor",
        Linea_tipo: "tierra",
        Rareza: "rara",
        Reglas: "Flying",
        Coste: 1
      };
      cardmanager.addCard("usuario1", card, (_,data) => {
        expect(data).to.equal('New collection created with card added!');
        done();
      });
    });
    it ("Leer una carta que existe", (done) => {
      cardmanager.readCard("usuario1", 2, (err, data) => {
        expect(data).to.equal(`Card found in collection!\nID: 2\nName: usuario1Card2\nCoste_mana: 1\nColor: multicolor\nLinea_tipo: tierra\nRareza: rara\nReglas: Flying\nCoste: 1\n`);
        done();
      });
    });
    it("Eliminar la carta 2", (done) => {
      cardmanager.removeCard("usuario1", 2, (_, data) => {
        expect(data).to.equal('Card removed from usuario1 collection!');
        done();
      });
    });
  });

  context("Pruebas en el usuario usuario2", () => {
    it("Agrega una carta con id 1 al usuario2 no válida", (done) => {
        const card = {
        ID: 1,
        Name: "usuario2Card",
        Coste_mana: 1,
        Color: "verde",
        Linea_tipo: "conjuro",
        Rareza: "mitica",
        Reglas: "Flying",
        Fuerza: 1,
        Resistencia: 1,
        Lealtad: 1,
        Coste: 1
      };
      cardmanager.addCard("usuario2", card, (err) => {
        expect(err).to.equal('Only Planeswalker card can have loyalty');
        done();
      });
    });
    it("Agrega una carta con id 1 al usuario2", (done) => {
      const card = {
      ID: 1,
      Name: "usuario2Card",
      Coste_mana: 7,
      Color: "verde",
      Linea_tipo: "conjuro",
      Rareza: "mitica",
      Reglas: "Flying",
      Coste: 1
    };
    cardmanager.addCard("usuario2", card, (_,data) => {
      expect(data).to.equal('New collection created with card added!');
      done();
    });
  });
    it("Modifica la carta con id 1", (done) => {
        const card = {
        ID: 1,
        Name: "usuario2Card",
        Coste_mana: 1,
        Color: "azul",
        Linea_tipo: "tierra",
        Rareza: "rara",
        Reglas: "Flying",
        Coste: 1
      };
      cardmanager.updateCard("usuario2", card, (_, data) => {
        expect(data).to.equal('Card updated at usuario2 collection!');
        done();
      });
    });
    it("Modificar una carta que no existe", (done) => {
        const card = {
        ID: 2,
        Name: "usuario2Card2",
        Coste_mana: 1,
        Color: "verde",
        Linea_tipo: "conjuro",
        Rareza: "mitica",
        Reglas: "Flying",
        Coste: 1
      };
      cardmanager.updateCard("usuario2", card, (data) => {
        expect(data).to.equal('Card not found at usuario2 collection!');
        done();
      });
    });
    it("Modificar una carta con un usuario que no existe", (done) => {
        const card = {
        ID: 1,
        Name: "usuario2Card",
        Coste_mana: 1,
        Color: "azul",
        Linea_tipo: "tierra",
        Rareza: "rara",
        Reglas: "Flying",
        Coste: 1
      };
      cardmanager.updateCard("usuario3", card, (data) => {
        expect(data).to.equal('User: usuario3 not found!');
        done();
      });
    });
    it("Modificar una carta con un color no valido", (done) => {
        const card = {
        ID: 1,
        Name: "usuario2Card",
        Coste_mana: 1,
        Color: "amarillo",
        Linea_tipo: "Creature",
        Rareza: "Common",
        Reglas: "Flying",
        Fuerza: 1,
        Resistencia: 1,
        Lealtad: 1,
        Coste: 1
      };
      cardmanager.updateCard("usuario2", card, (data) => {
        expect(data).to.equal('Invalid color');
        done();
      });
    });
    it("Modificar una carta con una rareza no valida", (done) => {
        const card = {
        ID: 1,
        Name: "usuario2Card",
        Coste_mana: 1,
        Color: "azul",
        Linea_tipo: "criatura",
        Rareza: "interesante",
        Reglas: "Flying",
        Fuerza: 1,
        Resistencia: 1,
        Lealtad: 1,
        Coste: 1
      };
      cardmanager.updateCard("usuario2", card, (data) => {
        expect(data).to.equal('Invalid rarity');
        done();
      });
    });
    it("Modificar una carta con una linea de tipo no valida", (done) => {
        const card = {
        ID: 1,
        Name: "usuario2Card",
        Coste_mana: 1,
        Color: "azul",
        Linea_tipo: "tipo",
        Rareza: "comun",
        Reglas: "Flying",
        Fuerza: 1,
        Resistencia: 1,
        Lealtad: 1,
        Coste: 1
      };
      cardmanager.updateCard("usuario2", card, (data) => {
        expect(data).to.equal('Invalid type');
        done();
      });
    });
    it("Modificar una carta con un ID no valido", (done) => {
        const card = {
        ID: 1.5,
        Name: "usuario2Card",
        Coste_mana: 1,
        Color: "azul",
        Linea_tipo: "criatura",
        Rareza: "comun",
        Reglas: "Flying",
        Fuerza: 1,
        Resistencia: 1,
        Lealtad: 1,
        Coste: 1
      };
      cardmanager.updateCard("usuario2", card, (data) => {
        expect(data).to.equal('Invalid ID');
        done();
      });
    });
    it("Agregar una carta ya existente", (done) => {
        const card = {
        ID: 1,
        Name: "usuario2Card",
        Coste_mana: 1,
        Color: "azul",
        Linea_tipo: "tierra",
        Rareza: "rara",
        Reglas: "Flying",
        Coste: 1
      };
      cardmanager.addCard("usuario2", card, (err) => {
        expect(err).to.equal(`Card already exists at usuario2 collection!`);
        done();
      });
    });
    it("Agregar una carta con id 2", (done) => {
        const card = {
        ID: 2,
        Name: "usuario2Card2",
        Coste_mana: 1,
        Color: "azul",
        Linea_tipo: "tierra",
        Rareza: "rara",
        Reglas: "Flying",
        Coste: 1
      };
      cardmanager.addCard("usuario2", card, (_,data) => {
        expect(data).to.equal('New collection created with card added!');
        done();
      });
    });
    it("Listar todas las cartas en la colección con dos cartas", (done) => {
      cardmanager.listCards("usuario2", (_, data) => {
        expect(data).to.equal('User collection found!\n-------------------\nID: 1\nName: usuario2Card\nCoste_mana: 1\nColor: azul\nLinea_tipo: tierra\nRareza: rara\nReglas: Flying\nCoste: 1\n-------------------\nID: 2\nName: usuario2Card2\nCoste_mana: 1\nColor: azul\nLinea_tipo: tierra\nRareza: rara\nReglas: Flying\nCoste: 1\n-------------------\n');
        done();
      });
    });
    it("Elimina la carta con id 1", (done) => {
      cardmanager.removeCard("usuario2", 1, (_, data) => {
        expect(data).to.equal('Card removed from usuario2 collection!');
        done();
      });
    });
    it("Lista las cartas de la coleccion", (done) => {
      cardmanager.listCards("usuario2", (_, data) => {
        expect(data).to.equal('User collection found!\n-------------------\nID: 2\nName: usuario2Card2\nCoste_mana: 1\nColor: azul\nLinea_tipo: tierra\nRareza: rara\nReglas: Flying\nCoste: 1\n-------------------\n');
        done();
      });
    });
    it("Eliminar la carta 2", (done) => {
      cardmanager.removeCard("usuario2", 2, (_, data) => {
        expect(data).to.equal('Card removed from usuario2 collection!');
        done();
      });
    });
  });

  context("Pruebas en el usuario usuario3", () => {
    it("Elminar una carta de un usuario que no existe", (done) => {
      cardmanager.removeCard("usuario3", 1, (data) => {
        expect(data).to.equal('Card not found at usuario3 collection!');
        done();
      });
    });
    it("Agregar una carta de planeswalker sin lealtad", (done) => {
      const card = {
        ID: 1,
        Name: "usuario3Card",
        Coste_mana: 1,
        Color: "azul",
        Linea_tipo: "planeswalker",
        Rareza: "rara",
        Reglas: "Flying",
        Coste: 1
      };
      cardmanager.addCard("usuario3", card, (data) => {
        expect(data).to.equal('Planeswalker card must have loyalty');
        done();
      });
    });
    it("Agregar una carta de tipo criatura sin fuerza", (done) => {
      const card = {
        ID: 1,
        Name: "usuario3Card",
        Coste_mana: 1,
        Color: "azul",
        Linea_tipo: "criatura",
        Rareza: "rara",
        Reglas: "Flying",
        Coste: 1
      };
      cardmanager.addCard("usuario3", card, (data) => {
        expect(data).to.equal('Creature card must have power and toughness');
        done();
      });
    });
    it("Agregar una carta de tipo criatura sin resistencia", (done) => {
      const card = {
        ID: 1,
        Name: "usuario3Card",
        Coste_mana: 1,
        Color: "azul",
        Linea_tipo: "criatura",
        Rareza: "rara",
        Reglas: "Flying",
        Fuerza: 1,
        Coste: 1
      };
      cardmanager.addCard("usuario3", card, (data) => {
        expect(data).to.equal('Creature card must have power and toughness');
        done();
      });
    });
    it("Agregar una carta de tipo conjuro con fuerza", (done) => {
      const card = {
        ID: 1,
        Name: "usuario3Card",
        Coste_mana: 1,
        Color: "azul",
        Linea_tipo: "conjuro",
        Rareza: "rara",
        Reglas: "Flying",
        Fuerza: 1,
        Coste: 1
      };
      cardmanager.addCard("usuario3", card, (data) => {
        expect(data).to.equal('Only Creature card can have power and toughness');
        done();
      });
    });
  });
});