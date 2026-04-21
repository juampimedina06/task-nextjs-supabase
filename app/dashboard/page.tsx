"use client";
import { AvatarBadge } from "@/components/AvatarBadge";
import { useAuth } from "@/context/AuthContext";
import { getImagenUrl } from "@/lib/utils";
import { LayoutGrid } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const { user } = useAuth();
  console.log(user);

  return (
    <>
      <nav className="flex  justify-between px-6 py-4">
        <div className="flex items-center gap-2">
          <LayoutGrid size={32} />
          <h1 className="text-2xl font-bold">Dashboard</h1>
        </div>

        {user && (
          <Link href="/profile">
            <AvatarBadge
              name={user?.name}
              avatar_url={getImagenUrl(user?.avatar_url || "")}
            />
          </Link>
        )}
      </nav>
      <form action="/api/auth/signout" method="post">
        <button className="button block" type="submit">
          Sign out
        </button>
      </form>
    </>
  );
}

//<form action="/api/auth/signout" method="post">
//          <button className="button block" type="submit">
//            Sign out
//          </button>
//        </form>
