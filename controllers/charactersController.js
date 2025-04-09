// controllers/charactersController.js
const charactersService = require('../services/charactersService');

async function getCharacters(filters) {
    // Lógica para obtener personajes, priorizando la caché y la base de datos
    const cachedCharacters = await charactersService.getCharactersFromCache(filters);
    if (cachedCharacters) {
        return cachedCharacters;
    }
    const databaseCharacters = await charactersService.getCharactersFromDatabase(filters);
    if (databaseCharacters && databaseCharacters.length > 0) {
        charactersService.setCharactersInCache(filters, databaseCharacters);
        return databaseCharacters;
    }
    const apiCharacters = await charactersService.getCharactersFromApi(filters);
    charactersService.saveCharactersToDatabase(apiCharacters);
    charactersService.setCharactersInCache(filters, apiCharacters);
    return apiCharacters;
}

module.exports = {
    getCharacters,
};