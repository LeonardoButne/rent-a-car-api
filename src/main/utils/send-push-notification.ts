import { GoogleAuth } from 'google-auth-library';
import fetch from 'node-fetch';
import * as fs from 'fs';

const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH || './firebase-service-account.json';
const projectId = process.env.FIREBASE_PROJECT_ID || 'SEU_PROJECT_ID'; // Substitua pelo seu projectId

const SCOPES = ['https://www.googleapis.com/auth/firebase.messaging'];
const FCM_ENDPOINT = `https://fcm.googleapis.com/v1/projects/${projectId}/messages:send`;

export async function sendPushNotification(
  to: string,
  title: string,
  body: string,
  data: Record<string, any> = {},
  options: { sound?: string } = {}
) {
  const auth = new GoogleAuth({
    keyFile: serviceAccountPath,
    scopes: SCOPES,
  });

  const client = await auth.getClient();
  const accessToken = await client.getAccessToken();

  const message: any = {
    message: {
      token: to,
      notification: {
        title,
        body,
      },
      data,
    },
  };

  // Adiciona som para Android e iOS se solicitado
  if (options.sound) {
    message.message.android = { notification: { sound: options.sound } };
    message.message.apns = {
      payload: {
        aps: {
          sound: options.sound,
        },
      },
    };
  }

  const response = await fetch(FCM_ENDPOINT, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken.token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Erro ao enviar push: ${error}`);
  }
  return response.json();
} 