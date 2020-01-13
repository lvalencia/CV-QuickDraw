/*
 *  ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 *  Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *  SPDX-License-Identifier: Apache-2.0
 *  ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 */

const deploymentConfiguration: Configuration = {
    name: 'cv-quickdraw',
    deployments: {
        development: {
            module: '@litexa/deploy-aws',
            s3Configuration: { bucketName: 'cv-quickdraw' },
            askProfile: 'diamond-games-devs',
            awsProfile: 'cv_dev'
        }
    },
    plugins: {}
};

export = deploymentConfiguration;
