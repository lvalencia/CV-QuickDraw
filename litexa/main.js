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
        action: 'start-round'
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

const WEAPONS = [
    // 'bottle',
    // 'cup',
    // 'spoon',
    'banana',
    // 'apple',
    'orange',
    'cell phone'
    // 'book'
];

const MAX_WEAPONS = 3;

function promptWeapons() {
    return WEAPONS.join(', ');
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function getAbsoluteUrl(relativePath) {
    return `${litexa.assetsRoot}${litexa.language}/dist/${relativePath}`;
}
