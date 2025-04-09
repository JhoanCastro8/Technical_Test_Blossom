const cron = require('node-cron');
    const axios = require('axios');
    const { Character: CharacterModel } = require('./models');

    cron.schedule('0 0 */12 * * *', async () => {
    console.log('Ejecutando la tarea cron para actualizar personajes...');
    try {
    const response = await axios.get('https://rickandmortyapi.com/graphql', {
    params: {
    query: `
    query {
    characters {
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
    const characters = response.data.data.characters.results;
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
    console.log('Actualización de personajes completada.');
    } catch (error) {
    console.error('Error al actualizar personajes:', error);
    }
    });