const axios = require('axios');
const { Character } = require('./models/index');

const resolvers = {
    Query: {
        characters: async (_, { name, status, species, gender, origin, page }) => {
            try {
                console.log('Fetching characters from API...'); // Log

                let url = `https://rickandmortyapi.com/api/character/?page=${page || 1}`;
                if (name) url += `&name=${name}`;
                if (status) url += `&status=${status}`;
                if (species) url += `&species=${species}`;
                if (gender) url += `&gender=${gender}`;
                if (origin) url += `&origin=${origin}`;
                const response = await axios.get(url);
                const characters = response.data.results;

                console.log('Characters from API:', characters); // Log

                for (const character of characters) {
                    const existingCharacter = await Character.findOne({ where: { id: character.id } });
                    if (!existingCharacter) {
                        await Character.create(character);
                        console.log('Character saved:', character.id); // Log
                    } else {
                        console.log('Character already exists:', character.id); // Log
                    }
                }

                console.log('Characters returned to GraphQL client:', characters); // Log

                return characters;
            } catch (error) {
                console.error('Error fetching/saving characters:', error);
                return [];
            }
        },
    },
};

module.exports = resolvers;