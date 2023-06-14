import React from "react";
import AccountLayout from "./layout";

function AccountPage() {
  return (
    <AccountLayout>
        <div> TEST </div>
    </AccountLayout>
  );
}

AccountPage.getLayout = function getLayout(page: React.ReactElement) {
  
}

export default AccountPage;
