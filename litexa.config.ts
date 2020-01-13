/*
 *  ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 *  Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *  SPDX-License-Identifier: Apache-2.0
 *  ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 */

const deploymentConfiguration: Configuration = {
    name: 'cv-quickdraw',
    deployments: {
        drhouse: {
            module: '@litexa/deploy-aws',
            s3Configuration: { bucketName: 'cv-quickdraw' },
            askProfile: 'diamond-games-devs',
            awsProfile: 'drhouse'
        }
    },
    plugins: {}
};

export = deploymentConfiguration;
