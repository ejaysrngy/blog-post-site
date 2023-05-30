import React from 'react'
import Image from 'next/image';
import classes from './single-post.module.scss'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';

import { SinglePostComponentTypes } from './types';
import { HeaderComponent } from '@/components/common';

export default function SinglePostComponent(props: SinglePostComponentTypes) {
  const { excerpt, image, title } = props.postDetails;
  
  return (
    <div className={classes.root}>
      <article className={classes.articleContainer}>
        <div className={classes.headerContainer}>
          <div className={classes.title}>
          <HeaderComponent text={title} variant="h3" />
          </div>
          <Image
            src={image}
            alt={title}
            width={200}
            height={200}
          />
        </div>
        <hr />
        <div>
          <ReactMarkdown children={excerpt} /> 
        </div>
      </article>
    </div>
  );
}
