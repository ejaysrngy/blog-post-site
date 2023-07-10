import dynamic from "next/dynamic";

import HeroSection from "./Hero";

const MainLayout = dynamic(() => import("./Layout/index"), {
  ssr: false,
});

import CreatePost from "./Posts/Create";
import PostCards from "./Posts/PostCards";
import SinglePostComponent from "./Posts/SinglePost";
const FeaturedPosts = dynamic(() => import("./Posts/FeaturedPosts"), {
  loading: () => <span> Loading... </span>,
});

import { HeaderComponent, MenuComponent, CustomTextField, CustomPasswordInput } from "./common";

import ContactForm from "./Contact/ContactForm";

import SignUpLoginContainer from "./Account/SignUpLogin";

export {
  // Account
  SignUpLoginContainer,
  // Components
  HeaderComponent,
  MenuComponent,
  CustomTextField,
  CustomPasswordInput,
  // Contact
  ContactForm,
  // Hero
  HeroSection,
  // Layout
  MainLayout,
  // Posts
  CreatePost,
  FeaturedPosts,
  PostCards,
  SinglePostComponent,
};
