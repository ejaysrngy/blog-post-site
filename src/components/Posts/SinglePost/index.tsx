import React from "react";
import Image from "next/image";
import classes from "./single-post.module.scss";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

import { SinglePostComponentTypes } from "./types";
import { HeaderComponent } from "@/components/common";

export default function SinglePostComponent(props: SinglePostComponentTypes) {
  const { image, title, content } = props.postDetails;

  return (
    <div className={classes.root}>
      <article className={classes.contentContainer}>
        <div className={classes.headerContainer}>
          <div className={classes.title}>
            <HeaderComponent text={title} variant="h3" />
          </div>
          <Image src={image} alt={title} width={200} height={200} />
        </div>
        <hr />
        <div className={classes.articleContainer}>
          <ReactMarkdown
            components={{
              // referred from https://amirardalan.com/blog/use-next-image-with-react-markdown
              p: (paragraph: any) => {
                const { node } = paragraph;

                if (node.children[0].tagName === "img") {
                  const image = node.children[0];

                  return (
                    <div className={classes.articleImgContainer}>
                      <Image
                        src={image.properties.src}
                        width={250}
                        height={250}
                        alt={image.alt}
                      />
                    </div>
                  );
                }
                return <p>{paragraph.children}</p>;
              },
              code: (code: any): any => {
                const {className, children} = code;

                const split = className.split('-');
                const language = split[1]

                return (
                  <SyntaxHighlighter language={language}>
                    {children}
                  </SyntaxHighlighter>
                );
              },
            }}
          >
            {content}
          </ReactMarkdown>
        </div>
      </article>
    </div>
  );
}
