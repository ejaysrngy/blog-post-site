import dynamic from "next/dynamic";

import HeroSection from "./Hero";

import PostCards from "./Posts/PostCards";
import SinglePostComponent from "./Posts/SinglePost";
const FeaturedPosts = dynamic(() => import("./Posts/FeaturedPosts"), {
  loading: () => <span> Loading... </span>,
});

import { HeaderComponent } from "./common";

import ContactForm from "./Contact/ContactForm";

export {
  // Components
  HeaderComponent,
  // Contact
  ContactForm,
  // Hero
  HeroSection,
  // Posts
  FeaturedPosts,
  PostCards,
  SinglePostComponent,
};
