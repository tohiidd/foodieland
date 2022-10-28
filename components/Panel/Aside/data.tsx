import { BiFoodMenu } from "react-icons/bi";
import { MdArticle } from "react-icons/md";
import { SiGooglemessages } from "react-icons/si";
import { BsPeopleFill } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";

export const asideOptions = [
  {
    id: 1,
    name: "recipes",
    icon: <BiFoodMenu />,
    route: "",
    options: [
      { id: 1, name: "recipes list", route: "recipes/list" },
      { id: 2, name: "add recipe", route: "recipes/add" },
    ],
  },
  {
    id: 2,
    name: "articles",
    icon: <MdArticle />,
    route: "",
    options: [
      { id: 1, name: "articles list", route: "articles/list" },
      { id: 2, name: "add article", route: "articles/add" },
    ],
  },
  {
    id: 3,
    name: "messages",
    icon: <SiGooglemessages />,
    route: "/messages",
    options: [],
  },

  {
    id: 4,
    name: "exit account",
    icon: <FiLogOut />,
    route: "/",
    options: [],
  },
];
