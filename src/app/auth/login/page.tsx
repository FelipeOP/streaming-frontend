import React from "react";
import SignInForm from "./sign-in-form";
import { redirect } from "next/navigation";
import { getAuthCredentials } from "../actions";

export default async function Page() {
  const { token } = await getAuthCredentials();

  if (token) {
    redirect("/streaming");
  }

  return <SignInForm />;
}
