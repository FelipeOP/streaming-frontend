import { redirect } from "next/navigation";
import { getAuthCredentials } from "../auth/actions";
import { getAllByType } from "./actions";
import StreamingSection from "./streaming-section";

export default async function Page() {
  const { token } = await getAuthCredentials();

  if (!token) {
    redirect("/auth/login");
  }
  const allContent = await getAllByType("all", "name", "ASC");
  return <StreamingSection data={allContent} />;
}
