import React, { useEffect, useState } from "react";

import dynamic from "next/dynamic";
import useUiStore from "@/store/uiStore";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import useAccountStore from "@/store/accountStore";
import classes from "./create-edit-post.module.scss";

import { useRouter } from "next/router";
import { stringToHyphenCase } from "@/utils/string-fns";
import { Button, OutlinedInput, InputLabel } from "@mui/material";

const MDEditor = dynamic(
  () => import("@uiw/react-md-editor").then((mod) => mod.default),
  { ssr: false }
);
const EditerMarkdown = dynamic(
  () =>
    import("@uiw/react-md-editor").then((mod) => {
      return mod.default.Markdown;
    }),
  { ssr: false }
);

function CreateEditPost(props: { isEdit: boolean; editData?: any }) {
  const { isEdit, editData } = props;

  const router = useRouter();
  const openNotif = useUiStore((state: any) => state.openNotif);

  const user = useAccountStore((state: any) => state.user);
  const { uid } = user;

  const [titleBox, setTitleBox] = useState("");
  const [textBox, setTextbox] = useState("");
  const [excerpt, setExcerpt] = useState("");

  useEffect(() => {
    if (isEdit) {
      setTitleBox(editData.title);
      setTextbox(editData.content);
      setExcerpt(editData.excerpt);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit]);

  const handleSubmit = async () => {
    const postSlug = stringToHyphenCase(titleBox);

    const response = await fetch("/api/posts/create-post", {
      method: "POST",
      body: JSON.stringify({
        uid: uid,
        text: textBox,
        slug: postSlug,
        title: titleBox,
        excerpt: excerpt,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      openNotif({ status: true, text: "Nice! You created a post!" });
      router.push("/profile/posts");
    } else {
      openNotif({ status: true, text: "Something went wrong, try again" });
    }
  };

  const handleEdit = async () => {
    const response = await fetch("/api/posts/edit-post", {
      method: "PUT",
      body: JSON.stringify({
        key: editData.key,
        text: textBox,
        title: titleBox,
        excerpt: excerpt,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      openNotif({ status: true, text: "You updated your post!" });
      router.push("/profile/posts");
    } else {
      openNotif({ status: true, text: "Something went wrong, try again" });
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.titleBox}>
        <InputLabel htmlFor="title-box">Title</InputLabel>
        <OutlinedInput
          fullWidth
          id="title-box"
          value={titleBox}
          onChange={(e) => setTitleBox(e.target.value)}
        />
      </div>
      <div className={classes.excerpt}>
        <InputLabel htmlFor="excerpt">Displayed Excerpt</InputLabel>
        <OutlinedInput
          fullWidth
          id="excerpt"
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
        />
      </div>
      <div className={classes.editor}>
        <MDEditor
          value={textBox}
          onChange={(e) => setTextbox(e as any)}
          style={{ border: "1px solid black" }}
          height={window.innerHeight * 0.5}
        >
          <EditerMarkdown source={textBox} style={{ whiteSpace: "pre-wrap" }} />
        </MDEditor>
      </div>
      <div className={classes.btnContainer}>
        <Button onClick={isEdit ? handleEdit : handleSubmit}> Submit </Button>
      </div>
    </div>
  );
}

export default CreateEditPost;
