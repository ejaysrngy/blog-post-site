import React, { useEffect, useState } from "react";

import nookies from "nookies";
import AccountLayout from "./layout";
import classes from "./account-index.module.scss";
import Login from "@/components/Account/SignUpLogin/Login";

import * as yup from "yup";
import { ModeEdit } from "@mui/icons-material";
import { CustomTextField } from "@/components";
import { firebaseAdmin } from "../api/firebase/admin";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAuthContext } from "@/hooks/AuthProvider/useAuthProvider";
import { InferGetServerSidePropsType, GetServerSidePropsContext } from "next";
import {
  Box,
  Modal,
  Button,
  Avatar,
  Typography,
  IconButton,
  CircularProgress,
} from "@mui/material";
import useUiStore from "@/store/uiStore";

const schema = yup.object({
  username: yup
    .string()
    .trim("Whitespaces are not allowed")
    .required("This field is required"),
  displayName: yup.string().required("This field is required"),
});

type FormData = yup.InferType<typeof schema>;

function AccountPage(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const { currentUser, isLoading, updateUserInfo } = useAuthContext();
  const openNotif = useUiStore((state: any) => state.openNotif);
  const reauthenticateModalisOpen = useUiStore(
    (state: any) => state.reauthenticateModalisOpen
  );
  const openReauthenticateModal = useUiStore(
    (state: any) => state.openReauthenticateModal
  );
  const closeReauthenticateModal = useUiStore(
    (state: any) => state.closeReauthenticateModal
  );

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
    // populate fields if currentUser data is available
    const fields = ["displayName", "username"];

    if (currentUser) {
      const { displayName, email } = currentUser;

      fields.forEach((field, index) => {
        setValue(field as any, [displayName, email].at(index));
      });
    }
  }, [currentUser]);

  const onSubmit: SubmitHandler<any> = async (data) => {
    const { displayName, username } = data;

    const responseUserInfo = await updateUserInfo({ displayName, username });

    if (
      !responseUserInfo?.status &&
      responseUserInfo?.code.includes("account-info")
    ) {
      openReauthenticateModal();
    } else if (responseUserInfo?.status) {
      // set edit mode to false after successful edit
      setIsEditMode(false);
      openNotif({ status: true, text: responseUserInfo.message });
    }
  };

  return (
    <AccountLayout>
      <div className={classes.root}>
        <div className={classes.header}>
          <Typography variant="h4"> Account </Typography>
          <IconButton onClick={() => setIsEditMode(isEditMode ? false : true)}>
            <ModeEdit color={isEditMode ? "primary" : "inherit"} />
          </IconButton>
        </div>
        <div className={classes.content}>
          {/* load a spinner if useAuthContext is loading */}
          {isLoading ? (
            <Box sx={{ display: "flex" }}>
              <CircularProgress />
            </Box>
          ) : (
            <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
              <div className={classes.detailsContainer}>
                <div className={classes.formFields}>
                  <CustomTextField
                    size="small"
                    errors={errors}
                    disabled={!isEditMode}
                    inputId="displayName"
                    reactFormName="displayName"
                    fieldName="Displayed Name"
                    reactFormRegister={{ ...register("displayName") }}
                  />
                  <CustomTextField
                    size="small"
                    errors={errors}
                    disabled={!isEditMode}
                    inputId="username-email"
                    reactFormName="username"
                    fieldName="Email"
                    reactFormRegister={{ ...register("username") }}
                  />
                </div>
                <div className={classes.avatarContainer}>
                  <Avatar
                    alt="user-avatar"
                    src={imagePreview}
                    sx={{ width: 200, height: 200 }}
                  />
                  <input
                    accept="image/*"
                    className={classes.input}
                    style={{ display: "none" }}
                    id="raised-button-file"
                    multiple
                    type="file"
                    onChange={(e) => {
                      if (e.currentTarget.files) {
                        setImagePreview(
                          URL.createObjectURL(e.currentTarget.files[0])
                        );
                      }
                    }}
                    disabled={!isEditMode}
                  />
                  <label htmlFor="raised-button-file">
                    <Button
                      component="span"
                      className={classes.button}
                      disabled={!isEditMode}
                    >
                      Upload
                    </Button>
                  </label>
                </div>
              </div>
              <div>
                <Button type="submit" disabled={!isEditMode}>
                  SUBMIT
                </Button>
              </div>
            </form>
          )}
        </div>

        <Modal
          open={reauthenticateModalisOpen}
          onClose={closeReauthenticateModal}
        >
          <Box
            sx={{
              position: "absolute" as "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              border: "2px solid #000",
              boxShadow: 24,
              p: 4,
            }}
          >
            <Typography>Reauthenticate Your Account</Typography>
            <Login />
          </Box>
        </Modal>
      </div>
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
