"use client";

import { Button } from "@/components/ui/button";
import useAuthStore, { UserInfo } from "@/store/authStore";
import { useEffect, useState } from "react";

function ShowUser() {
  const { getUserSession, logout } = useAuthStore();
  const [user, setUser] = useState<UserInfo | undefined>(undefined);

  useEffect(() => {
    const user = getUserSession()
    if (user) {
      setUser(user);
    }
  }, []);
  
  return (
    <div>
      <p>{JSON.stringify(user)}</p>
      <Button onClick={() => logout()} variant="outline" className="w-full flex gap-x-2">
        logout
      </Button>
    </div>
  )
}

export default ShowUser