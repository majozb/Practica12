import "mocha";
import { expect } from "chai";
import chalk from "chalk";
import { CardManager as modi } from "../src/modificacion/card-manager.js";

describe("Modificacion", () => {
  const cardmanager = modi.getInstance();
  context("Pruebas en el usuario usuario", () => {
    it("Agregar carta con id 1", () => {
      const card = {
        ID: 1,
        Name: "Carta1",
        Coste_mana: 1,
        Color: "rojo",
        Linea_tipo: "tierra",
        Rareza: "comun",
        Reglas: "reglas",
        Coste: 10
      };
			return cardmanager.addCardPr("usuario", card).then((res) => {
				expect(res).to.equal(`${(chalk.green(`New collection created with card added!`))}`);
			});
    });
    it("Eliminamos la carta con id 1", () => {
      return cardmanager.removeCardPr("usuario", 1).then((res) => {
        expect(res).to.equal(`${(chalk.green(`Card removed from usuario collection!`))}`);
      });
    });
    it("Eliminamos la carta no existente", () => {
      return cardmanager.removeCardPr("usuario", 1).catch((res) => {
        expect(res).to.equal(`${(chalk.red(`Card not found at usuario collection!`))}`);
      });
    });
    it("Agregamos carta con id 4", () => {
      const card = {
        ID: 4,
        Name: "Carta4",
        Coste_mana: 1,
        Color: "multicolor",
        Linea_tipo: "tierra",
        Rareza: "comun",
        Reglas: "reglas",
        Coste: 10
      };
      return cardmanager.addCardPr("usuario", card).then((res) => {
        expect(res).to.equal(`${(chalk.green(`New collection created with card added!`))}`);
      });
    });
    it("Listamos las cartas", (done) => {
      cardmanager.listCards("usuario", (_, data) => {
        expect(data).to.equal(`${(chalk.green('User collection found!'))}\n-------------------\nID: 4\nName: Carta4\nCoste_mana: 1\nColor: multicolor\nLinea_tipo: tierra\nRareza: comun\nReglas: reglas\nCoste: 10\n-------------------\n`);
        done();
      });
    });
    it("Leemos una carta", (done) => {
      cardmanager.readCard("usuario", 4, (err, data) => {
        expect(data).to.equal(`${(chalk.green('Card found in collection!'))}\nID: 4\nName: Carta4\nCoste_mana: 1\nColor: multicolor\nLinea_tipo: tierra\nRareza: comun\nReglas: reglas\nCoste: 10\n`);
        done();
      });
    });
    it("Eliminamos la carta con id 4", () => {
      return cardmanager.removeCardPr("usuario", 4).then((res) => {
        expect(res).to.equal(`${(chalk.green(`Card removed from usuario collection!`))}`);
      });
    });
    it("Agregamos carta con id 5", () => {
      const card = {
        ID: 5,
        Name: "Carta5",
        Coste_mana: 1,
        Color: "multicolor",
        Linea_tipo: "tierra",
        Rareza: "comun",
        Reglas: "reglas",
        Coste: 10
      };
      return cardmanager.addCardPr("usuario", card).then((res) => {
        expect(res).to.equal(`${(chalk.green(`New collection created with card added!`))}`);
      });
    });
    it("Eliminamos la carta con id 5", () => {
      return cardmanager.removeCardPr("usuario", 5).then((res) => {
        expect(res).to.equal(`${(chalk.green(`Card removed from usuario collection!`))}`);
      });
    });
    it("Agregamos carta con id 6", () => {
      const card = {
        ID: 6,
        Name: "Carta5",
        Coste_mana: 1,
        Color: "multicolor",
        Linea_tipo: "tierra",
        Rareza: "comun",
        Reglas: "reglas",
        Coste: 10
      };
      return cardmanager.addCardPr("usuario", card).then((res) => {
        expect(res).to.equal(`${(chalk.green(`New collection created with card added!`))}`);
      });
    });
    it("Eliminamos la carta con id 6", () => {
      return cardmanager.removeCardPr("usuario", 6).then((res) => {
        expect(res).to.equal(`${(chalk.green(`Card removed from usuario collection!`))}`);
      });
    });
    it("Agregamos carta con id 7", () => {
      const card = {
        ID: 7,
        Name: "Carta5",
        Coste_mana: 1,
        Color: "multicolor",
        Linea_tipo: "tierra",
        Rareza: "comun",
        Reglas: "reglas",
        Coste: 10
      };
      return cardmanager.addCardPr("usuario", card).then((res) => {
        expect(res).to.equal(`${(chalk.green(`New collection created with card added!`))}`);
      });
    });
    it("Eliminamos la carta con id 7", () => {
      return cardmanager.removeCardPr("usuario", 7).then((res) => {
        expect(res).to.equal(`${(chalk.green(`Card removed from usuario collection!`))}`);
      });
    });
    it("Agregamos carta con id 8", () => {
      const card = {
        ID: 8,
        Name: "Carta5",
        Coste_mana: 1,
        Color: "multicolor",
        Linea_tipo: "tierra",
        Rareza: "comun",
        Reglas: "reglas",
        Coste: 10
      };
      return cardmanager.addCardPr("usuario", card).then((res) => {
        expect(res).to.equal(`${(chalk.green(`New collection created with card added!`))}`);
      });
    });
    it("Eliminamos la carta con id 8", () => {
      return cardmanager.removeCardPr("usuario", 8).then((res) => {
        expect(res).to.equal(`${(chalk.green(`Card removed from usuario collection!`))}`);
      });
    });
    it("Agregamos carta con id 9", () => {
      const card = {
        ID: 9,
        Name: "Carta5",
        Coste_mana: 1,
        Color: "multicolor",
        Linea_tipo: "tierra",
        Rareza: "comun",
        Reglas: "reglas",
        Coste: 10
      };
      return cardmanager.addCardPr("usuario", card).then((res) => {
        expect(res).to.equal(`${(chalk.green(`New collection created with card added!`))}`);
      });
    });
    it("Eliminamos la carta con id 9", () => {
      return cardmanager.removeCardPr("usuario", 9).then((res) => {
        expect(res).to.equal(`${(chalk.green(`Card removed from usuario collection!`))}`);
      });
    });
    it("Agregamos carta con id 10", () => {
      const card = {
        ID: 10,
        Name: "Carta5",
        Coste_mana: 1,
        Color: "multicolor",
        Linea_tipo: "tierra",
        Rareza: "comun",
        Reglas: "reglas",
        Coste: 10
      };
      return cardmanager.addCardPr("usuario", card).then((res) => {
        expect(res).to.equal(`${(chalk.green(`New collection created with card added!`))}`);
      });
    });
    it("Eliminamos la carta con id 10", () => {
      return cardmanager.removeCardPr("usuario", 10).then((res) => {
        expect(res).to.equal(`${(chalk.green(`Card removed from usuario collection!`))}`);
      });
    });
    it("Agregamos carta con id 11", () => {
      const card = {
        ID: 11,
        Name: "Carta5",
        Coste_mana: 1,
        Color: "multicolor",
        Linea_tipo: "tierra",
        Rareza: "comun",
        Reglas: "reglas",
        Coste: 10
      };
      return cardmanager.addCardPr("usuario", card).then((res) => {
        expect(res).to.equal(`${(chalk.green(`New collection created with card added!`))}`);
      });
    });
    it("Eliminamos la carta con id 11", () => {
      return cardmanager.removeCardPr("usuario", 11).then((res) => {
        expect(res).to.equal(`${(chalk.green(`Card removed from usuario collection!`))}`);
      });
    });
    it("Agregamos carta con id 12", () => {
      const card = {
        ID: 12,
        Name: "Carta5",
        Coste_mana: 1,
        Color: "multicolor",
        Linea_tipo: "tierra",
        Rareza: "comun",
        Reglas: "reglas",
        Coste: 10
      };
      return cardmanager.addCardPr("usuario", card).then((res) => {
        expect(res).to.equal(`${(chalk.green(`New collection created with card added!`))}`);
      });
    });
    it("Eliminamos la carta con id 12", () => {
      return cardmanager.removeCardPr("usuario", 12).then((res) => {
        expect(res).to.equal(`${(chalk.green(`Card removed from usuario collection!`))}`);
      });
    });
  });
});