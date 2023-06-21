import React from "react";
import nookies from "nookies";

import AccountLayout from "./layout";
import { firebaseAdmin } from "../api/firebase/admin";
import { InferGetServerSidePropsType, GetServerSidePropsContext } from "next";

function AccountPage(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  return (
    <AccountLayout>
      <div> TEST </div>
    </AccountLayout>
  );
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    // fetch cookies from the AuthProvider
    const cookies = nookies.get(ctx);
    const token = await firebaseAdmin.auth().verifyIdToken(cookies.token);

    return {
      props: { token: token },
    };
  } catch (err) {
    ctx.res.writeHead(302, { Location: "/" });
    ctx.res.end();
    return { props: {} as never };
  }
};

export default AccountPage;
