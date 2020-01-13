"use strict";
/*
 *  ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 *  Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *  SPDX-License-Identifier: Apache-2.0
 *  ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 */
var deploymentConfiguration = {
    name: 'cv-quickdraw',
    deployments: {
        development: {
            module: '@litexa/deploy-aws',
            s3Configuration: { bucketName: '' },
            askProfile: '',
            awsProfile: ''
        }
    },
    plugins: {}
};
module.exports = deploymentConfiguration;
