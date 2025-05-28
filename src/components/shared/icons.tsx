import {
  AreaChart,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BarChart,
  BoldIcon,
  Book,
  Bookmark,
  Briefcase,
  Calendar,
  Check,
  CheckSquare,
  ChevronDown,
  ChevronUp,
  ChevronsUpDown,
  CircleArrowUp,
  CircleCheck,
  CircleDashed,
  CircleHelp,
  CodeIcon,
  Command,
  Download,
  Dribbble,
  Edit2,
  Eye,
  EyeOff,
  Facebook,
  Github,
  Globe,
  GripVertical,
  Heading1,
  Heading2,
  Heading3,
  Home,
  Image,
  Infinity,
  Instagram,
  ItalicIcon,
  Layers,
  LayoutDashboard,
  Library,
  Link,
  Linkedin,
  List,
  ListOrdered,
  Loader,
  Lock,
  LogIn,
  LogOut,
  Mail,
  Mails,
  Maximize2,
  Megaphone,
  Menu,
  Moon,
  MoreVertical,
  MousePointerClick,
  Plug,
  Plus,
  Quote,
  Radio,
  RefreshCw,
  Rss,
  Search,
  Send,
  Settings,
  Slash,
  SquarePen,
  SquareSplitVertical,
  StrikethroughIcon,
  Sun,
  SwatchBook,
  TextIcon,
  TextQuoteIcon,
  Trash,
  Twitter,
  UnderlineIcon,
  Upload,
  User2,
  Users,
  X,
} from "lucide-react";

export type IconProps = {
  size?: number;
  color?: string;
  className?: string;
};

export const Icons = {
  locked: Lock,
  radio: Radio,
  plus: Plus,
  rss: Rss,
  users: Users,
  book: Book,
  send: Send,
  download: Download,
  briefCase: Briefcase,
  dashboard: LayoutDashboard,
  chevronsUpDown: ChevronsUpDown,
  swatchBook: SwatchBook,
  chevronUp: ChevronUp,
  chevronDown: ChevronDown,
  refreshCw: RefreshCw,
  command: Command,
  gripVertical: GripVertical,
  upload: Upload,
  eye: Eye,
  eyeOff: EyeOff,
  check: Check,
  user: User2,
  infinity: Infinity,
  mousePointerClick: MousePointerClick,
  squarePen: SquarePen,
  more: MoreVertical,
  sun: Sun,
  slash: Slash,
  dribbble: Dribbble,
  moon: Moon,
  circleHelp: CircleHelp,
  circleCheck: CircleCheck,
  home: Home,
  arrowRight: ArrowRight,
  collection: Library,
  maximize: Maximize2,
  trash: Trash,
  divider: SquareSplitVertical,
  edit: Edit2,
  menu: Menu,
  arrowUpRight: ArrowUpRight,
  settings: Settings,
  logout: LogOut,
  spinner: Loader,
  x: X,
  megaPhone: Megaphone,
  mail: Mail,
  mails: Mails,
  date: Calendar,
  areaChart: AreaChart,
  bookmark: Bookmark,
  layers: Layers,
  search: Search,
  bold: BoldIcon,
  italic: ItalicIcon,
  strike: StrikethroughIcon,
  underline: UnderlineIcon,
  checkSquare: CheckSquare,
  code: CodeIcon,
  heading1: Heading1,
  heading2: Heading2,
  heading3: Heading3,
  listOrdered: ListOrdered,
  textIcon: TextIcon,
  textQuote: TextQuoteIcon,
  link: Link,
  task: CheckSquare,
  login: LogIn,
  circleArrowUp: CircleArrowUp,
  circleDashed: CircleDashed,
  bullet: List,
  numbered: ListOrdered,
  quote: Quote,
  image: Image,
  bar: BarChart,
  arrowLeft: ArrowLeft,
  defaultThemeStyleSkeleton: ({ className }: IconProps) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="140"
        height="174"
        fill="none"
        viewBox="0 0 140 174"
        className={className}
      >
        <path
          fill="currentColor"
          d="M30 15c0 8.284-6.716 15-15 15S0 23.284 0 15 6.716 0 15 0s15 6.716 15 15M40 10.5A1.5 1.5 0 0 1 41.5 9h27a1.5 1.5 0 0 1 0 3h-27a1.5 1.5 0 0 1-1.5-1.5M0 51.5A1.5 1.5 0 0 1 1.5 50h27a1.5 1.5 0 0 1 0 3h-27A1.5 1.5 0 0 1 0 51.5M0 63a5 5 0 0 1 5-5h130a5 5 0 0 1 5 5v34a5 5 0 0 1-5 5H5a5 5 0 0 1-5-5zM0 123.5a1.5 1.5 0 0 1 1.5-1.5h27a1.5 1.5 0 0 1 0 3h-27a1.5 1.5 0 0 1-1.5-1.5M40 18.5a1.5 1.5 0 0 1 1.5-1.5h57a1.5 1.5 0 0 1 0 3h-57a1.5 1.5 0 0 1-1.5-1.5M0 135a5 5 0 0 1 5-5h130a5 5 0 0 1 5 5v34a5 5 0 0 1-5 5H5a5 5 0 0 1-5-5z"
        ></path>
      </svg>
    );
  },
  linkInBioThemeStyleSkeleton: ({ className }: IconProps) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="130"
        height="140"
        fill="none"
        viewBox="0 0 130 140"
        className={className}
      >
        <path
          fill="currentColor"
          d="M0 5a5 5 0 0 1 5-5h20a5 5 0 0 1 5 5v20a5 5 0 0 1-5 5H5a5 5 0 0 1-5-5zM0 97a5 5 0 0 1 5-5h30a5 5 0 0 1 5 5v38a5 5 0 0 1-5 5H5a5 5 0 0 1-5-5zM45 97a5 5 0 0 1 5-5h30a5 5 0 0 1 5 5v38a5 5 0 0 1-5 5H50a5 5 0 0 1-5-5zM90 97a5 5 0 0 1 5-5h30a5 5 0 0 1 5 5v38a5 5 0 0 1-5 5H95a5 5 0 0 1-5-5zM0 47.5A1.5 1.5 0 0 1 1.5 46h27a1.5 1.5 0 0 1 0 3h-27A1.5 1.5 0 0 1 0 47.5M0 60.5A1.5 1.5 0 0 1 1.5 59h57a1.5 1.5 0 0 1 0 3h-57A1.5 1.5 0 0 1 0 60.5M0 68.5A1.5 1.5 0 0 1 1.5 67h76a1.5 1.5 0 0 1 0 3h-76A1.5 1.5 0 0 1 0 68.5"
        ></path>
      </svg>
    );
  },
  freeStyleThemeStyleSkeleton: ({ className }: IconProps) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="140"
        height="146"
        fill="none"
        viewBox="0 0 140 146"
        className={className}
      >
        <path
          fill="currentColor"
          d="M0 1.5A1.5 1.5 0 0 1 1.5 0h27a1.5 1.5 0 0 1 0 3h-27A1.5 1.5 0 0 1 0 1.5M0 48.5A1.5 1.5 0 0 1 1.5 47h27a1.5 1.5 0 0 1 0 3h-27A1.5 1.5 0 0 1 0 48.5M0 9.5A1.5 1.5 0 0 1 1.5 8h56a1.5 1.5 0 0 1 0 3h-56A1.5 1.5 0 0 1 0 9.5M0 17.5A1.5 1.5 0 0 1 1.5 16h94a1.5 1.5 0 0 1 0 3h-94A1.5 1.5 0 0 1 0 17.5M0 25.5A1.5 1.5 0 0 1 1.5 24h122a1.5 1.5 0 0 1 0 3H1.5A1.5 1.5 0 0 1 0 25.5M0 120.5a1.5 1.5 0 0 1 1.5-1.5h27a1.5 1.5 0 0 1 0 3h-27a1.5 1.5 0 0 1-1.5-1.5M0 128.5a1.5 1.5 0 0 1 1.5-1.5h56a1.5 1.5 0 0 1 0 3h-56a1.5 1.5 0 0 1-1.5-1.5M0 136.5a1.5 1.5 0 0 1 1.5-1.5h94a1.5 1.5 0 0 1 0 3h-94a1.5 1.5 0 0 1-1.5-1.5M0 144.5a1.5 1.5 0 0 1 1.5-1.5h122a1.5 1.5 0 0 1 0 3H1.5a1.5 1.5 0 0 1-1.5-1.5M0 60a5 5 0 0 1 5-5h130a5 5 0 0 1 5 5v34a5 5 0 0 1-5 5H5a5 5 0 0 1-5-5z"
        ></path>
      </svg>
    );
  },
  twitter: Twitter,
  linkedin: Linkedin,
  plug: Plug,
  facebook: Facebook,
  instagram: Instagram,
  github: Github,
  globe: Globe,
  logo: ({ size }: IconProps) => {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M50 100C77.6142 100 100 77.6142 100 50C100 40.4639 97.3304 31.5514 92.6978 23.9689L58.3334 58.3333H41.6667V41.6666L76.0311 7.30222C68.4487 2.6696 59.5361 0 50 0C22.3858 0 0 22.3858 0 50C0 77.6142 22.3858 100 50 100Z"
        />
      </svg>
    );
  },
  google: ({ size = 24 }: IconProps) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z" />
      </svg>
    );
  },
  gmail: ({ size = 24 }: IconProps) => {
    return (
      <svg
        width={size}
        height={size}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="52 42 88 66"
      >
        <path fill="#4285f4" d="M58 108h14V74L52 59v43c0 3.32 2.69 6 6 6" />
        <path fill="#34a853" d="M120 108h14c3.32 0 6-2.69 6-6V59l-20 15" />
        <path
          fill="#fbbc04"
          d="M120 48v26l20-15v-8c0-7.42-8.47-11.65-14.4-7.2"
        />
        <path fill="#ea4335" d="M72 74V48l24 18 24-18v26L96 92" />
        <path
          fill="#c5221f"
          d="M52 51v8l20 15V48l-5.6-4.2c-5.94-4.45-14.4-.22-14.4 7.2"
        />
      </svg>
    );
  },
  outlook: ({ size = 24 }: IconProps) => {
    return (
      <svg
        width={size}
        height={size}
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        viewBox="0 0 1831.085 1703.335"
        xmlSpace="preserve"
      >
        <path
          fill="#0A2767"
          d="M1831.083 894.25a40.879 40.879 0 00-19.503-35.131h-.213l-.767-.426-634.492-375.585a86.175 86.175 0 00-8.517-5.067 85.17 85.17 0 00-78.098 0 86.37 86.37 0 00-8.517 5.067l-634.49 375.585-.766.426c-19.392 12.059-25.337 37.556-13.278 56.948a41.346 41.346 0 0014.257 13.868l634.492 375.585a95.617 95.617 0 008.517 5.068 85.17 85.17 0 0078.098 0 95.52 95.52 0 008.517-5.068l634.492-375.585a40.84 40.84 0 0020.268-35.685z"
        />
        <path
          fill="#0364B8"
          d="M520.453 643.477h416.38v381.674h-416.38V643.477zM1745.917 255.5V80.908c1-43.652-33.552-79.862-77.203-80.908H588.204C544.552 1.046 510 37.256 511 80.908V255.5l638.75 170.333L1745.917 255.5z"
        />
        <path fill="#0078D4" d="M511 255.5h425.833v383.25H511V255.5z" />
        <path
          fill="#28A8EA"
          d="M1362.667 255.5H936.833v383.25L1362.667 1022h383.25V638.75l-383.25-383.25z"
        />
        <path fill="#0078D4" d="M936.833 638.75h425.833V1022H936.833V638.75z" />
        <path fill="#0364B8" d="M936.833 1022h425.833v383.25H936.833V1022z" />
        <path
          fill="#14447D"
          d="M520.453 1025.151h416.38v346.969h-416.38v-346.969z"
        />
        <path fill="#0078D4" d="M1362.667 1022h383.25v383.25h-383.25V1022z" />
        <linearGradient
          id="SVGID_1_"
          x1="1128.458"
          x2="1128.458"
          y1="811.083"
          y2="1.998"
          gradientTransform="matrix(1 0 0 -1 0 1705.333)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#35B8F1" />
          <stop offset="1" stopColor="#28A8EA" />
        </linearGradient>
        <path
          fill="url(#SVGID_1_)"
          d="M1811.58 927.593l-.809.426-634.492 356.848c-2.768 1.703-5.578 3.321-8.517 4.769a88.437 88.437 0 01-34.407 8.517l-34.663-20.27a86.706 86.706 0 01-8.517-4.897L447.167 906.003h-.298l-21.036-11.753v722.384c.328 48.196 39.653 87.006 87.849 86.7h1230.914c.724 0 1.363-.341 2.129-.341a107.79 107.79 0 0029.808-6.217 86.066 86.066 0 0011.966-6.217c2.853-1.618 7.75-5.152 7.75-5.152a85.974 85.974 0 0034.833-68.772V894.25a38.323 38.323 0 01-19.502 33.343z"
        />
        <path
          fill="#0A2767"
          d="M1797.017 891.397v44.287l-663.448 456.791-686.87-486.174a.426.426 0 00-.426-.426l-63.023-37.899v-31.938l25.976-.426 54.932 31.512 1.277.426 4.684 2.981s645.563 368.346 647.267 369.197l24.698 14.478c2.129-.852 4.258-1.703 6.813-2.555 1.278-.852 640.879-360.681 640.879-360.681l7.241.427z"
          opacity="0.5"
        />
        <path
          fill="#1490DF"
          d="M1811.58 927.593l-.809.468-634.492 356.848c-2.768 1.703-5.578 3.321-8.517 4.769a88.96 88.96 0 01-78.098 0 96.578 96.578 0 01-8.517-4.769l-634.49-356.848-.766-.468a38.326 38.326 0 01-20.057-33.343v722.384c.305 48.188 39.616 87.004 87.803 86.7H1743.277c48.188.307 87.5-38.509 87.807-86.696V894.25a38.33 38.33 0 01-19.504 33.343z"
        />
        <path
          d="M1185.52 1279.629l-9.496 5.323a92.806 92.806 0 01-8.517 4.812 88.173 88.173 0 01-33.47 8.857l241.405 285.479 421.107 101.476a86.785 86.785 0 0026.7-33.343l-637.729-372.604z"
          opacity="0.1"
        />
        <path
          d="M1228.529 1255.442l-52.505 29.51a92.806 92.806 0 01-8.517 4.812 88.173 88.173 0 01-33.47 8.857l113.101 311.838 549.538 74.989a86.104 86.104 0 0034.407-68.815v-9.326l-602.554-351.865z"
          opacity="0.05"
        />
        <path
          fill="#28A8EA"
          d="M514.833 1703.333h1228.316a88.316 88.316 0 0052.59-17.033l-697.089-408.331a86.706 86.706 0 01-8.517-4.897L447.125 906.088h-.298l-20.993-11.838v719.914c-.048 49.2 39.798 89.122 88.999 89.169-.001 0-.001 0 0 0z"
        />
        <path
          d="M1022 418.722v908.303c-.076 31.846-19.44 60.471-48.971 72.392a73.382 73.382 0 01-28.957 5.962H425.833V383.25H511v-42.583h433.073c43.019.163 77.834 35.035 77.927 78.055z"
          opacity="0.1"
        />
        <path
          d="M979.417 461.305v908.302a69.36 69.36 0 01-6.388 29.808c-11.826 29.149-40.083 48.273-71.54 48.417H425.833V383.25h475.656a71.493 71.493 0 0135.344 8.943c26.104 13.151 42.574 39.883 42.584 69.112z"
          opacity="0.2"
        />
        <path
          d="M979.417 461.305v823.136c-.208 43-34.928 77.853-77.927 78.225H425.833V383.25h475.656a71.493 71.493 0 0135.344 8.943c26.104 13.151 42.574 39.883 42.584 69.112z"
          opacity="0.2"
        />
        <path
          d="M936.833 461.305v823.136c-.046 43.067-34.861 78.015-77.927 78.225H425.833V383.25h433.072c43.062.023 77.951 34.951 77.927 78.013a.589.589 0 01.001.042z"
          opacity="0.2"
        />
        <linearGradient
          id="SVGID_2_"
          x1="162.747"
          x2="774.086"
          y1="1383.074"
          y2="324.259"
          gradientTransform="matrix(1 0 0 -1 0 1705.333)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#1784D9" />
          <stop offset="0.5" stopColor="#107AD5" />
          <stop offset="1" stopColor="#0A63C9" />
        </linearGradient>
        <path
          fill="url(#SVGID_2_)"
          d="M78.055 383.25h780.723c43.109 0 78.055 34.947 78.055 78.055v780.723c0 43.109-34.946 78.055-78.055 78.055H78.055c-43.109 0-78.055-34.947-78.055-78.055V461.305c0-43.108 34.947-78.055 78.055-78.055z"
        />
        <path
          fill="#FFF"
          d="M243.96 710.631a227.05 227.05 0 0189.17-98.495 269.56 269.56 0 01141.675-35.515 250.91 250.91 0 01131.114 33.683 225.014 225.014 0 0186.742 94.109 303.751 303.751 0 0130.405 138.396 320.567 320.567 0 01-31.299 144.783 230.37 230.37 0 01-89.425 97.388 260.864 260.864 0 01-136.011 34.578 256.355 256.355 0 01-134.01-34.067 228.497 228.497 0 01-87.892-94.28 296.507 296.507 0 01-30.745-136.735 329.29 329.29 0 0130.276-143.845zm95.046 231.227a147.386 147.386 0 0050.163 64.812 131.028 131.028 0 0078.353 23.591 137.244 137.244 0 0083.634-24.358 141.156 141.156 0 0048.715-64.812 251.594 251.594 0 0015.543-90.404 275.198 275.198 0 00-14.649-91.554 144.775 144.775 0 00-47.182-67.537 129.58 129.58 0 00-82.91-25.55 135.202 135.202 0 00-80.184 23.804 148.626 148.626 0 00-51.1 65.365 259.759 259.759 0 00-.341 186.728l-.042-.085z"
        />
        <path fill="#50D9FF" d="M1362.667 255.5h383.25v383.25h-383.25V255.5z" />
      </svg>
    );
  },
  icloudMail: ({ size = 24 }: IconProps) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        width={size}
        height={size}
        version="1.1"
        viewBox="0 0 80 52"
      >
        <defs>
          <linearGradient
            id="linearGradient1072"
            x1="-108.903"
            x2="-1137.198"
            y1="2124.834"
            y2="2110.651"
            gradientTransform="matrix(.0774 0 0 .0774 88.374 -128.026)"
            gradientUnits="userSpaceOnUse"
            xlinkHref="#linearGradient1070"
          />
          <linearGradient id="linearGradient1070">
            <stop offset="0" stopColor="#3e82f4" stopOpacity="1" />
            <stop offset="1" stopColor="#93dcf7" stopOpacity="1" />
          </linearGradient>
        </defs>
        <path
          fill="url(#linearGradient1072)"
          fillOpacity="1"
          stroke="none"
          strokeDasharray="none"
          strokeMiterlimit="4"
          strokeOpacity="1"
          strokeWidth="0"
          d="M45.864.751a21.519 21.519 0 00-18.736 11.014 11.804 11.804 0 00-5.152-1.192 11.804 11.804 0 00-11.621 9.916A16.255 16.255 0 00.378 35.482a16.255 16.255 0 0016.263 16.24 16.255 16.255 0 002.039-.148h45.188a15.13 15.202 0 00.713.035 15.13 15.202 0 00.679-.035h1.082v-.08a15.13 15.202 0 0013.361-15.087v-.03a15.13 15.202 0 00-12.317-14.9A21.519 21.519 0 0045.864.751z"
          opacity="1"
        />
      </svg>
    );
  },
};
