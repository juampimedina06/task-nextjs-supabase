import UserProfile from "./components/UserProfile";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ProfilePage() {
  return (
    <div className="flex justify-center items-center h-screen p-4">
      <div className="absolute top-4 left-10 ">
        <Link href="/dashboard">
          <Button variant="ghost" size="icon">
            <ArrowLeft size={24} />
            Volver
          </Button>
        </Link>
      </div>
      <UserProfile />
    </div>
  );
}
