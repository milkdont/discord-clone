import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { initialProfile } from "@/lib/initial-profile";
import { RedirectToSignIn } from "@clerk/nextjs";
import { InitialModal } from "@/components/modals/initial-modal";

const SetupPage = async () => {
  const profile = await initialProfile();

  if (!profile) {
    return <RedirectToSignIn redirectUrl="/sign-in" />;
  }

  const server = await db.server.findFirst({
    where: {
      members: { 
        some: {
          profileId: profile.id
        }
      }
    }
  });

  if (server) {
    return redirect(`/servers/${server.id}`);
  }

  return <InitialModal/>
};

export default SetupPage;