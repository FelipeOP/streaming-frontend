"use server";

import { cookies } from "next/headers";

export async function signUpWithEmailAndPassword(credentials: {
  email: string;
  password: string;
}) {
  const endpoint = "http://localhost:8080/api/v1/auth/register";
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  const status = response.status;
  if (status === 403) {
    return {
      error: "Email invalido o ya registrado",
      status,
    };
  }

  const data = await response.json();
  const token = data.jwtToken;
  const userId = data.userId;
  await saveAuthCredentials(token, credentials.email, userId);

  return { status };
}

export async function signInWithEmailAndPassword(credentials: {
  email: string;
  password: string;
}) {
  const endpoint = "http://localhost:8080/api/v1/auth/login";
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  const status = response.status;
  if (status === 403) {
    return {
      error: "Email o contraseña incorrectos",
      status,
    };
  }

  const data = await response.json();
  const token = data.jwtToken;
  const userId = data.userId;

  await saveAuthCredentials(token, credentials.email, userId);
  return { status };
}

async function saveAuthCredentials(token: string, email: string, userId: any) {
  const cookieStore = cookies();
  cookieStore.set("token", token);
  cookieStore.set("email", email);
  cookieStore.set("userId", userId);
}

export async function getAuthCredentials() {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;
  const email = cookieStore.get("email")?.value;
  const userId = cookieStore.get("userId")?.value;
  return { token, email, userId };
}
