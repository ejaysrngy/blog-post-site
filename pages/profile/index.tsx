import React, { useEffect } from "react";

import { useRouter } from "next/router";
import AccountLayout from "./layout";
import { useAuthContext } from "@/components/common/AuthProvider/useAuthProvider";

function AccountPage() {
  const router = useRouter()
  const {currentUser} = useAuthContext()

  useEffect(() => {
    if (currentUser) {
      router.replace('/', undefined, { shallow: true })
    }
  }, [currentUser])

  return (
    <AccountLayout>
      <div> TEST </div>
    </AccountLayout>
  );
}

export default AccountPage;
