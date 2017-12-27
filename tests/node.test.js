var customUnique = require('../index.min.js');

test('customUnique is correctly exported', () => {
    expect(customUnique).toBeDefined();
});

test('compile is defined', () => {
    expect(customUnique).toHaveProperty('compile');
});
