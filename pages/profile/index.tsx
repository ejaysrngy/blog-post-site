import React, { useEffect, useRef, useState } from "react";

import * as yup from "yup";
import nookies from "nookies";
import AccountLayout from "./layout";
import classes from "./account-index.module.scss";
import Login from "@/components/Account/SignUpLogin/Login";

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
import { ModeEdit } from "@mui/icons-material";
import { CustomTextField } from "@/components";
import { storage } from "../..//firebase/config";
import { firebaseAdmin } from "../../firebase/admin";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAuthContext } from "@/hooks/AuthProvider/useAuthProvider";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { InferGetServerSidePropsType, GetServerSidePropsContext } from "next";

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
  const setUserAvatar = useUiStore((state: any) => state.setUserAvatar);

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const imageRef = useRef("");
  const [imagePreview, setImagePreview] = useState("");
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    // populate fields if currentUser data is available
    const fields = ["displayName", "username"];

    if (currentUser) {
      const { displayName, email, photoURL } = currentUser;

      setImagePreview(photoURL);

      fields.forEach((field, index) => {
        setValue(field as any, [displayName, email].at(index));
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  const onSubmit: SubmitHandler<any> = async (data) => {
    const { displayName, username } = data;

    const responseUserInfo = await updateUserInfo({
      displayName,
      username,
      photoUrl: imageRef.current,
    });

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

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    let file;

    if (event.currentTarget.files) {
      // get currently uploaded file object
      file = event.currentTarget?.files[0];
    }

    if (!file) return;

    // make references of image in Firebase
    const storageRef = ref(storage, `images/${file.name}`);
    // upload image to Firebase
    const uploadTask = uploadBytesResumable(storageRef, file);

    // add a loading state or anything to disable submission of account update
    // before the image has been uploaded
    // uploaded photo does not reflect on account IF upload hasn't finished yet
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        setIsUploading(true);
      },
      (error) => {
        openNotif({ status: true, text: "Upload failed" });
        setIsUploading(false);
      },
      // successful result
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          openNotif({ status: true, text: "Upload success!" });
          imageRef.current = downloadURL;
          setUserAvatar(downloadURL);
        });
        setIsUploading(false);
      }
    );
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
                      handleUpload(e);
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
                      disabled={!isEditMode || isUploading}
                    >
                      Upload
                    </Button>
                  </label>
                </div>
              </div>
              <div>
                <Button type="submit" disabled={!isEditMode || isUploading}>
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
    await firebaseAdmin.auth().verifyIdToken(cookies.token);

    return {
      props: {},
    };
  } catch (err) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
};

export default AccountPage;
