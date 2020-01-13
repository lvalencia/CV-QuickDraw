const skillManifest: Manifest = {
    publishingInformation: {
        isAvailableWorldwide: false,
        distributionCountries: ['US'],
        distributionMode: 'PUBLIC',
        category: 'GAMES',
        testingInstructions: 'replace with testing instructions',
        locales: {
            'en-US': {
                name: 'Cv Quickdraw',
                invocation: 'Quick Draw',
                summary: 'replace with brief description, no longer than 120 characters',
                description: 'Longer description, goes to the skill store. Line breaks are supported.',
                examplePhrases: [
                    'Alexa, launch quick draw',
                    'Alexa, open quick draw',
                    'Alexa, play quick draw',
                ],
                keywords: [
                    'game',
                    'fun',
                    'single player',
                    'modify this list as appropriate'
                ]
            }
        }
    },
    privacyAndCompliance: {
        allowsPurchases: false,
        usesPersonalInfo: false,
        isChildDirected: false,
        isExportCompliant: true,
        containsAds: false,
        locales: {
            'en-US': {
                privacyPolicyUrl: 'https://www.example.com/privacy.html',
                termsOfUseUrl: 'https://www.example.com/terms.html'
            }
        }
    }
};

export = {
    manifest: skillManifest
};
