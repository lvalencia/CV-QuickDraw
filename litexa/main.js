const Version = {
    PRIVATE_BETA: 'PRIVATE_BETA',
    PUBLIC_PREVIEW: 'PUBLIC_PREVIEW'
};

const SESSION_TOKEN = 'SESSION_TOKEN';

function createHtmlStartDirective(path, isAbsolutePath = false, options = {}) {
    const startDirective = {
        type: 'Alexa.Presentation.HTML.Start',
        configuration: {
            timeoutInSeconds: 480
        }
    };

    const version = options.version || Version.PUBLIC_PREVIEW;

    const data = options.data || {
        data: {}
    };
    const headers = options.headers || {};

    let url = isAbsolutePath ? path : getAbsoluteUrl(path);
    if (options.addTimestamp) {
        url = `${url}?ts=${new Date().getTime()}`;
    }

    if (version === Version.PUBLIC_PREVIEW) {
        Object.assign(startDirective, {
            data,
            request: {
                uri: url,
                method: 'GET',
                headers
            }
        });
    } else {
        Object.assign(startDirective, {
            sessionToken: SESSION_TOKEN,
            url,
            startupData: data
        });
    }

    if (options.hasOwnProperty('transformers')) {
        startDirective.transformers = options.transformers;
    }

    return startDirective;
}

function sendStartGameMessage() {
    return createHtmlHandleMessageDirective({
        actions: ['start-round']
    });
}

function createHtmlHandleMessageDirectiveResponse(request) {
    // Switch on Request and build response
    // return createHtmlStartDirective(response);
}

function createHtmlHandleMessageDirective(message, options = {}) {
    const result = {
        type: 'Alexa.Presentation.HTML.HandleMessage',
        message
    };

    if (options.hasOwnProperty('transformers')) {
        result.transformers = options.transformers;
    }

    return result;
}

function createTransformerDirective(text) {
    return createHtmlHandleMessageDirective({
        speechSSML: text
    }, {
        transformers: [
            {
                inputPath: 'speechSSML',
                outputName: 'speechUrl',
                transformer: 'ssmlToSpeech'
            },
        ]
    });
}

function promptWeapons() {
    return 'a <mark name="banana"/> banana, <mark name="orange"/> orange, and <mark name="cellphone"/> cell phone'
}

function mark(aMark) {
    return `<mark name="${aMark}" />`;
}

function getAbsoluteUrl(relativePath) {
    return `${litexa.assetsRoot}${litexa.language}/${relativePath}`;
}

litexa.responsePostProcessor = function (json, context) {
    if (HTML.isHTMLPresent() && json.response.outputSpeech) {
        const ssml = json.response.outputSpeech.ssml;


        let index = -1;
        if (!json.response.hasOwnProperty('directives')) {
            json.response.directives = [];
        }

        let count = 0;
        for (const directive of json.response.directives) {
            if (directive.type === 'Alexa.Presentation.HTML.HandleMessage') {
                index = count;
                break;
            }
            count++;
        }

        if (index < 0) {
            // wasnt there
            json.response.directives.push({
                type: 'Alexa.Presentation.HTML.HandleMessage',
                message: {
                    actions: ['output-speech'],
                    speechSSML: ssml,
                    guid: uuidv4()
                },
                transformers: [
                    {
                        inputPath: 'speechSSML',
                        outputName: 'speechUrl',
                        transformer: 'ssmlToSpeech'
                    },
                ]
            });
        } else {
            // is already there
            json.response.directives[index].transformers = [
                {
                    inputPath: 'speechSSML',
                    outputName: 'speechUrl',
                    transformer: 'ssmlToSpeech'
                }
            ];
            json.response.directives[index].message.actions.push('output-speech');
            json.response.directives[index].message.speechSSML = ssml;
            json.response.directives[index].message.guid = uuidv4();
        }
        delete json.response.outputSpeech;
    }
};

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}
