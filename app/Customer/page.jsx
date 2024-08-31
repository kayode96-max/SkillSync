import { auth } from "../auth";
import UserProfile from "./client";
import Link from "next/link";

const ServerPage = async () => {
  const session = await auth();

  if (!session) {
    return (
      <Link href="/Integrations">
        <button>Authenticate with GitHub</button>
      </Link>
    );
  }

  return <UserProfile />;
};

export default ServerPage;
