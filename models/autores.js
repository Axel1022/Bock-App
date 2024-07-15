const jsonFileHandler = require("../utils/jsonFileHandler");
const path = require("path");
const dataPath = path.join(
  path.dirname(require.main.filename),
  "data",
  "pokemones.json"
);

module.exports = class pokemon {
  constructor(id, Namepokemon, url, tipo, region) {
    this.id = id;
    this.Namepokemon = Namepokemon;
    this.UrlImg = url;
    this.Tipo = tipo;
    this.Region = region;
  }
  save() {
    jsonFileHandler.ReadAllData(dataPath, (pokemones) => {
      if (this.id) {
        const indexpokemon = pokemones.findIndex((p) => p.id === this.id);
        if (indexpokemon) {
          pokemones[indexpokemon] = this;
          jsonFileHandler.WriteData(dataPath, pokemones);
        }
      } else {
        this.id = Math.random().toString();
        pokemones.push(this);
        jsonFileHandler.WriteData(dataPath, pokemones);
      }
    });
  }
  static getAll(cb) {
    jsonFileHandler.ReadAllData(dataPath, cb);
  }
  static getByID(id, cb) {
    jsonFileHandler.ReadAllData(dataPath, function (pokemones) {
      const pokemon = pokemones.find((r) => r.id === id);
      cb(pokemon);
    });
  }
  static delete(id) {
    jsonFileHandler.ReadAllData(dataPath, function (pokemones) {
      const NewListpokemones = pokemones.filter((p) => p.id !== id);
      jsonFileHandler.WriteData(dataPath, NewListpokemones);
    });
  }
  static buscar(info, cb) {
    jsonFileHandler.BuscarNombre(dataPath, info, cb);
  }
};
