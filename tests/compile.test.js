var customUnique = require('../index.min.js');

test('compile returns a function', () => {
    var gen = customUnique.compile({a: '123'}, '((a))');
    expect(gen).toBeInstanceOf(Function);
});

test('compiled function generating intended values', () => {
    var gen = customUnique.compile({a: '123'}, '1232');
    expect(gen()).toBe('1232');
});
