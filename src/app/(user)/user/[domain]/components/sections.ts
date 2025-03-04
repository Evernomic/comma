import Newsletter from "../articles/components/newsletter";
import About from "./about";
import Articles from "./articles";
import Bookmarks from "./bookmarks";
import Connect from "./connect";
import WorkExperiences from "./experience";
import Projects from "./projects";

export default [
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
