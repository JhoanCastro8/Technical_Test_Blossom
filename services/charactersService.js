const axios = require('axios');
const { Character: CharacterModel } = require('../models');
const redis = require('redis');

const redisClient = redis.createClient();
redisClient.connect();

async function getCharactersFromApi(filters) {
    // Lógica para obtener personajes de la API de Rick y Morty
    try {
        const response = await axios.get('https://rickandmortyapi.com/graphql', {
            params: {
                query: `
                    query {
                        characters(filter: {
                            name: "${filters.name || ''}",
                            status: "${filters.status || ''}",
                            species: "${filters.species || ''}",
                            gender: "${filters.gender || ''}",
                            origin: "${filters.origin || ''}"
                        }) {
                            results {
                                id
                                name
                                status
                                species
                                gender
                                origin {
                                    name
                                }
                            }
                        }
                    }
                `,
            },
        });
        return response.data.data.characters.results;
    } catch (error) {
        console.error('Error fetching characters:', error);
        return [];
    }
}

async function getCharactersFromDatabase(filters) {
    // Lógica para obtener personajes de la base de datos
    return CharacterModel.findAll({ where: filters });
}

async function getCharactersFromCache(filters) {
    // Lógica para obtener personajes de la caché de Redis
    const key = JSON.stringify(filters);
    const cachedData = await redisClient.get(key);
    return cachedData ? JSON.parse(cachedData) : null;
}

async function setCharactersInCache(filters, characters) {
    // Lógica para almacenar personajes en la caché de Redis
    const key = JSON.stringify(filters);
    await redisClient.set(key, JSON.stringify(characters));
}

async function saveCharactersToDatabase(characters) {
    // Logica para guardar personajes en la base de datos.
    for (const character of characters) {
        await CharacterModel.upsert({
            id: character.id,
            name: character.name,
            status: character.status,
            species: character.species,
            gender: character.gender,
            origin: character.origin.name,
        });
    }
}

module.exports = {
    getCharactersFromApi,
    getCharactersFromDatabase,
    getCharactersFromCache,
    setCharactersInCache,
    saveCharactersToDatabase,
};