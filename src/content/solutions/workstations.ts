/** High Performance Computers — content from acestar.my/high-performance-computer (text tidied). */
import { asset } from "./assets";
import type { DeviceBrand, PageHero } from "./types";

export const hero: PageHero = {
  eyebrow: "High Performance Computers",
  title: "Workstations built around the way you work.",
  accent: "the way you work.",
  lead: "With over a decade of technical expertise, we provide workstation customisation for industries spanning creative, commercial and education.",
  primary: { label: "Talk to a specialist", href: "/contact" },
  secondary: { label: "Apple Solution", href: "/solutions/workstations/apple" },
  image: asset("2021/12/High-Performance-Computers-Background.png", "Hands typing on a laptop keyboard"),
  imageFit: "backdrop",
  crumbs: [{ label: "Home", href: "/" }, { label: "Solutions" }, { label: "High Performance Computers" }],
  chips: ["Apple", "HP", "Lenovo", "Dell", "Asus"],
};

export const brands: DeviceBrand[] = [
  {
    key: "apple",
    name: "Apple",
    banner: asset("2021/12/Apple-Background.png", "Apple banner"),
    intro:
      "Apple offers a computing experience like no other, lauded for the seamless, optimised operation between its OS and suite of apps.",
    story: [
      "Over the years, the Apple brand has been lauded for the seamless and optimised operation between its OS and suite of apps, designed and developed by the company itself. Macs have long been associated with high-powered graphic design. If your work is closely tied to the creative field and you have an eye for aesthetics, Apple machines are most likely your choice.",
      "These lean, mean machines are not just powerful but easy to use, and they integrate easily with mobile device management software and zero-touch deployment. Whether your organisation has ten devices or ten thousand, Apple fits easily into your existing infrastructure, and makes it easy to choose the right deployment option.",
      "Apple machines also boast some of the strongest security features, with an operating system designed with built-in protection to help keep your computer running clean and efficiently.",
    ],
    products: [
      {
        name: "Apple Mac Pro",
        desc: "The most powerful Mac ever built. With the most performance, expansion and configurability yet, it lets a wide range of professionals push the limits of what is possible.",
        image: asset("2021/11/Apple-Mac-Propng1.png", "Apple Mac Pro tower"),
      },
      {
        name: "iMac",
        desc: "Beautiful, intuitive all-in-one desktops with incredible processors, a Retina display and the world's most advanced desktop operating system.",
        image: asset("2021/11/iMac.png", "iMac in a range of colours"),
      },
      {
        name: "MacBook Pro",
        desc: "Apple's most powerful notebooks, with fast Apple silicon, incredible graphics and spectacular Retina displays, in 14- and 16-inch models.",
        image: asset("2021/11/Macbook-Pro.png", "MacBook Pro"),
      },
      {
        name: "MacBook Air",
        desc: "Power. It's in the Air. Apple-designed silicon, a backlit Magic Keyboard, and configurations with up to 16GB memory and 2TB storage.",
        image: asset("2021/11/MacBook-Air.png", "MacBook Air"),
      },
    ],
    link: { label: "Explore our Apple Solution", href: "/solutions/workstations/apple" },
  },
  {
    key: "hp",
    name: "HP",
    banner: asset("2021/12/HP-Background.png", "HP banner"),
    intro:
      "One of the leading computer brands in business, with a reputation for reliable, high-quality machines for people who depend on their laptop every day.",
    story: [
      "HP stands as one of the leading computer brands in the business world, with a reputation for reliable, high-quality computers, particularly for users who rely on their laptop operating smoothly and consistently for work. HP workstations accelerate workflow with industry-leading processing and zero throttling, so components run at top speed as you multitask.",
      "HP leads the industry in security with an always-on, resilient defence that operates from the BIOS up. Machines are tested and certified for professional applications, and with Acestar's consultation your HP workstations are configured to perform and built with the power to grow with you.",
    ],
    products: [
      {
        name: "ProBook Series",
        desc: "Affordable, modern PCs for today's work styles: thin and light, with the performance, security and durability growing companies need.",
        image: asset("2021/11/HP-Probook-series.png", "HP ProBook laptop"),
      },
      {
        name: "EliteBook Series",
        desc: "Sleek and well equipped, with strong security, simple manageability and powerful collaboration features, protected by HP Wolf Security.",
        image: asset("2021/11/HP-Elitebook-series.png", "HP EliteBook laptop"),
      },
      {
        name: "Elite Dragonfly Series",
        desc: "Mobility beyond expectation: AI-based audio, an anti-glare touch screen, Wi-Fi 6, powerful Intel Core processors and strong privacy features.",
        image: asset("2021/11/HP-Elite-Dragonfly-Series.png", "HP Elite Dragonfly laptop"),
      },
      {
        name: "ZBook Mobile Workstations",
        desc: "Portability with serious power to take on multimedia production tasks without compromise.",
        image: asset("2021/11/HP-Zbook-mobile-workstation-series.webp", "HP ZBook mobile workstation"),
      },
      {
        name: "Elite x360 Series",
        desc: "Solid build, plentiful features and businesslike design, with a 360-degree rotating display for tablet-mode use.",
        image: asset("2021/11/HP-Elite-X360-series.webp", "HP Elite x360 convertible laptops"),
      },
    ],
  },
  {
    key: "lenovo",
    name: "Lenovo",
    banner: asset("2021/12/Lenovo-Background.png", "Lenovo banner"),
    intro: "Award-winning designs and top-notch innovation, from one of the world's largest technology companies.",
    story: [
      "Lenovo designs, manufactures and sells PCs, tablets, workstations and servers, and has risen to become one of the world's largest technology companies by giving customers exactly what they need, when they need it. It is famed for award-winning designs and out-of-the-box innovation.",
      "Lenovo business workstations run efficiently and quietly, and are known for their durability, lower power consumption and comfortable handling. One size doesn't fit all, so our technical experts help you configure the machine that fits you and your work perfectly.",
    ],
    products: [
      {
        name: "ThinkPad P Series",
        desc: "The portability of a laptop with the performance of a workstation, ISV-certified for all major applications, with lightning-fast graphics in surprisingly light packages.",
        image: asset("2021/11/Lenovo-Thinkpad-P-series.webp", "Lenovo ThinkPad P series"),
      },
      {
        name: "ThinkPad T Series",
        desc: "Built to perform and engineered to endure, with epic battery life, fast USB-C Thunderbolt ports and powerful processing for the office, the field and everywhere between.",
        image: asset("2021/11/Lenovo-Thinkpad-T-series.webp", "Lenovo ThinkPad T series"),
      },
      {
        name: "ThinkPad X1",
        desc: "Innovation, style and uncompromised performance, from ultralight laptops and 2-in-1s to extreme power machines, with ThinkPad reliability and security.",
        image: asset("2021/11/Lenovo-Thinkpad-X1-Carbon.webp", "Lenovo ThinkPad X1 Carbon"),
      },
    ],
  },
  {
    key: "dell",
    name: "Dell",
    banner: asset("2021/12/Dell-Background.png", "Dell banner"),
    intro: "Professional, workstation-level computers that are well built, well supported and competitively priced.",
    story: [
      "Dell is a well-known and well-respected name in business computing, offering some of the best professional, workstation-level computers. They come with very good base specs that can be customised to your needs, at a very competitive price, in form factors from compact and space-saving to full workstations.",
      "Dell's industry-leading security offers comprehensive encryption, advanced authentication and leading-edge malware prevention from a single source, with robust, centralised data security, all backed by award-winning after-sales support.",
    ],
    products: [
      {
        name: "Latitude Laptops",
        desc: "The world's most intelligent business PCs, with built-in artificial intelligence.",
        image: asset("2021/11/Dell-Latitude_8xsmall.png", "Dell Latitude laptop"),
      },
      {
        name: "Precision Mobile Workstations",
        desc: "Dell's thinnest, smallest and lightest 17-inch mobile workstation is also the smartest.",
        image: asset("2021/11/Dell-Precision-Mobile-Workstations_6xsmall.png", "Dell Precision mobile workstation"),
      },
      {
        name: "XPS Laptops",
        desc: "XPS laptops and 2-in-1s, crafted from the highest-quality materials with stunning displays.",
        image: asset("2021/11/Dell-XPS-laptops_6xsmall.png", "Dell XPS laptop"),
      },
    ],
  },
  {
    key: "asus",
    name: "Asus",
    banner: asset("2023/10/BANNER-ASUS.png", "Asus banner"),
    intro:
      "Renowned for high-quality motherboards and graphics cards, Republic of Gamers (ROG) products and premium ZenBook laptops.",
    story: [
      "ASUS is renowned for its high-quality motherboards and graphics cards, innovative gaming products under the Republic of Gamers (ROG) brand, premium ZenBook laptops, and a commitment to delivering cutting-edge technology. Talk to us about the right Asus configuration for your team.",
    ],
    products: [],
  },
];
