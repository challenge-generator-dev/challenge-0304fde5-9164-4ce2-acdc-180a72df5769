import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import * as dotenv from 'dotenv';

dotenv.config();

const getConfig = () => {
    const region = process.env.AWS_REGION || 'us-east-1';
    const endpoint = process.env.DYNAMODB_ENDPOINT;
    const credentials = {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || 'local',
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || 'local',
    };

    const clientConfig: any = {
        region,
        credentials,
    };

    if (endpoint) {
        clientConfig.endpoint = endpoint;
    }

    return clientConfig;
};

let dynamoDBClient: DynamoDBClient | null = null;
let docClient: DynamoDBDocumentClient | null = null;

export const getDynamoDBClient = (): DynamoDBClient => {
    if (!dynamoDBClient) {
        dynamoDBClient = new DynamoDBClient(getConfig());
    }
    return dynamoDBClient;
};

export const getDocumentClient = (): DynamoDBDocumentClient => {
    if (!docClient) {
        docClient = DynamoDBDocumentClient.from(getDynamoDBClient(), {
            marshallOptions: {
                removeUndefinedValues: true,
            },
        });
    }
    return docClient;
};

export const getTableName = (): string => {
    return process.env.DYNAMODB_TABLE_NAME || 'products';
};