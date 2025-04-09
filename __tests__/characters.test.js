const { characters } = require('../resolvers').Query;

    describe('Characters Resolver', () => {
    it('should return an array of characters', async () => {
    const result = await characters(null, {});
    expect(Array.isArray(result)).toBe(true);
    });
    });