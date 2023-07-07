const _ = require('lodash');
const openapi = require('./openapi.json');
const Handlebars = require('handlebars');
const fs = require('fs-extra');
Handlebars.registerHelper('camelCase', function (str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
});

Handlebars.registerHelper('translationPath', function (path) {
    const arr = path.split('/').filter(Boolean); // ['pet', 'findByStatus']
    const capitalizedArr = arr.map(word => word.charAt(0).toUpperCase() + word.slice(1)); // ['Pet', 'FindByStatus']
    return capitalizedArr.join('');
});

Handlebars.registerHelper('translationParams', function (path) {
    const arr = path.split('/').filter(Boolean); // ['pet', 'findByStatus']
    const str = arr.map((word, index) => {
        if (index === 0) {
            return word.toLowerCase();
        } else {
            return word.charAt(0).toUpperCase() + word.slice(1);
        }
    }).join('');
    return str;
});


Handlebars.registerHelper('translationType', function (type) {
    const javaToJsTypes = {
        'boolean': 'Boolean',
        'byte': 'number',
        'integer': 'number',
        'char': 'String',
        'double': 'number',
        'float': 'number',
        'int': 'number',
        'long': 'number',
        'short': 'number',
        'String': 'String',
        'Object': 'Object',
        'Date': 'Date',
        'ArrayList': 'Array',
        'HashSet': 'Array',
        'HashMap': 'Object',
        'LinkedHashMap': 'Object',
        'TreeMap': 'Object',
        'BigInteger': 'number',
        'BigDecimal': 'number',
        'byte[]': 'ArrayBuffer',
        'InputStream': 'ArrayBuffer',
        'OutputStream': 'ArrayBuffer',
        'File': 'File',
        'Exception': 'Error',
        'Throwable': 'Error'
    };
    return javaToJsTypes.hasOwnProperty(type) ? javaToJsTypes[type] : type;
});

//console.log(openapi.paths)
_.forEach(openapi.paths, function (requests, url) {
    const outputAddress = url.split('/')[1];
    _.forEach(requests, async function (requestsInfo, requestsMethod) {

        const item = {
            url: url,
            type: requestsMethod,
            summary: requestsInfo.summary,
            parameters: _.reject(requestsInfo.parameters, {in: 'header'}),
            responses: _.get(requestsInfo, 'responses.200.content.application/json.schema.properties.data.properties'),
            requestBody: _.get(requestsInfo, 'requestBody.content')
        };

        console.log('item', item);
        // 使用模板
        const apiTemplate = fs.readFileSync('./apiTemplate.hbs', 'utf8');
        const modelTemplate = fs.readFileSync('./modelTemplate.hbs', 'utf8');
        await writeToFile(`api/${outputAddress}.ts`, Handlebars.compile(apiTemplate)(item));
        await writeToFile(`model/${outputAddress}.d.ts`, Handlebars.compile(modelTemplate)(item));

    });
});


async function writeToFile(filePath, content) {
    filePath = 'src/servers/' + filePath;
    try {
        await fs.outputFile(filePath, content, {flag: 'a'});
    } catch (err) {
        console.error(err);
    }
}
