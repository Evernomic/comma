import Newsletter from "../articles/components/newsletter";
import About from "./about";
import Articles from "./articles";
import Bookmarks from "./bookmarks";
import Connect from "./connect";
import WorkExperiences from "./experience";
import Intro from "./intro";
import NavTabs from "./nav-tabs";
import Projects from "./projects";

export default [
  {
    title: "Intro",
    component: Intro,
    position: 7,
  },
  {
    title: "Navigation",
    component: NavTabs,
    position: 8,
  },
  {
    title: "Newsletter",
    component: Newsletter,
    position: 0,
  },
  {
    title: "About",
    component: About,
    position: 1,
  },
  {
    title: "Work experience",
    component: WorkExperiences,
    position: 2,
  },
  {
    title: "Articles",
    component: Articles,
    position: 3,
  },
  {
    title: "Projects",
    component: Projects,
    position: 4,
  },
  {
    title: "Bookmarks",
    component: Bookmarks,
    position: 5,
  },
  {
    title: "Connect",
    component: Connect,
    position: 6,
  },
];
