import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
  UserPoolId: "ap-southeast-1_4G7kcguGH", 
  ClientId: "5kuv35ke2b3jvggf65rhu52t9e",  
};

export const userPool = new CognitoUserPool(poolData);
