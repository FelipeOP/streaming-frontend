import React from "react";
import SignUpForm from "./sign-up-form";
import { redirect } from "next/navigation";
import { getAuthCredentials } from "../actions";

export default async function Page() {
  const { token } = await getAuthCredentials();
  if (token) {
    redirect("/streaming");
  }
  return <SignUpForm />;
}
