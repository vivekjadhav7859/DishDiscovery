import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { GetCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);
const dbName = 'dish-discovery-db';

export const handler = async (event) => {
  let response = '';
  
  switch(event.httpMethod){
    case 'GET':
      if (event.resource === '/recipe/{id}') {
        // console.log(event.pathParameters.id)
        const pathparam = event.pathParameters;
        console.log("recipe id -> ",pathparam.id)
        response = await getRecipeById(pathparam.id)
      }
      break;
      
    default : response = buildResponse(404, 'Route not found')
    
  }
  
  return response;
};

// function to retrive recipe from ID
const getRecipeById = async (recipeId) => {
  const command = new GetCommand({
    TableName: dbName,
    Key: {
      'id': recipeId,
    },
  });

  try {
    const data = await docClient.send(command);
    
    const response = {
      Message: 'SUCCESS',
      Items: data
    };
    
    return buildResponse(200, response);
  } catch (error) {
    console.error('Error in getRecipeById:', error);
    return buildResponse(500, { Message: 'Internal Server Error' });
  }
};

function buildResponse(statusCode, body) {
  const response = {
    statusCode : statusCode,
    headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
        },
    body : JSON.stringify(body)
  }
  
  return response;
}
