# custom-unique
Generate custom and random unique strings.

`npm install --save custom-unique`

## Examples
```javascript
var customUnique = require('custom-unique');

var gen = customUnique.compile({n: '1n4n68dma98560d', a: '1234567890'}, '((n))-((a))-((n))-((a))');
gen(); // 08nmd5mn5a6141d-2335291955-6068n84a989n0a5-4633515073
gen(); // dnm85966885n60n-3751472625-4mdnd8606081854-5222094747

var serialGen = customUnique.compile({c: '1234567890', b: 'abcedfgh'}, '((c)4)-((b)4)-((c)4)-((b)4)');
serialGen(); // 4830-heea-0194-gfeg
serialGen(); // 5593-chcg-3889-ccch
```

## API
#### function compile(config, format)
Creates a function that returns random strings.

**Return value:** function ([prefix][, suffix])
* `config (Object)` An object containing all values that will replace the corresponding placeholders in `format`.
* `format (String)` An string containing placeholders that will be replaced by random values composed by `config`.

## Explanation
The keys of `config` can be referenced in `format`. Those references will be replaced by a random string composed of chars from the value of that key.

To reference a property from `config`, use the following syntax in format: `((property))`.

This reference will be replaced by a random value composed of chars from `config[property]` , and it will have the length equal to `config[property]`.

```javascript
var config = {ex: '123'};
var format = '--((ex))--';

var gen = customUnique.compile(config, format);
gen(); // --231--
gen(); // --312--
```
You can define the length yourself using this syntax: `((property)length)`.

```javascript
var config = {ex: '123'};
var format = '--((ex)10)--';

var gen = customUnique.compile(config, format);
gen(); // --1132222311--
gen(); // --1312313113--
```
You may add prefixes and suffixes to the generated strings.
```javascript
var config = {ex: '123'};
var format = '--((ex)10)--';

var gen = customUnique.compile(config, format);
gen('ID-'); // ID---2212122311--
gen('', 'HI'); // --1312313113--HI
gen('PHOTO', 'HI'); // PHOTO--1312313113--HI
```

