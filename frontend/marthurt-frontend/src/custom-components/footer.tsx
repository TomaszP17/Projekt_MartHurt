import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";

const iconMap = {
  faFacebook,
  faInstagram,
  faLinkedin,
};

type IconKey = keyof typeof iconMap;

interface SocialLink {
  icon: IconKey;
  href: string;
}

interface SectionLink {
  name: string;
  href: string;
}

interface SectionDetails {
  label: string;
  value: string;
}

interface Section {
  title: string;
  links?: SectionLink[];
  details?: SectionDetails[];
}

const sectionsData: {
  socialLinks: SocialLink[];
  sections: Section[];
} = {
  socialLinks: [
    {
      icon: "faFacebook",
      href: "#",
    },
    {
      icon: "faInstagram",
      href: "#",
    },
    {
      icon: "faLinkedin",
      href: "#",
    },
  ],
  sections: [
    {
      title: "Katalog",
      links: [{ name: "Lampy", href: "#" }],
    },
    {
      title: "O nas",
      links: [
        { name: "Our Experience", href: "#" },
        { name: "News", href: "#" },
        { name: "Certificates", href: "#" },
        { name: "Careers", href: "#" },
      ],
    },
    {
      title: "Dla Kupujących",
      links: [
        { name: "Demo Room", href: "#" },
        { name: "Leasing", href: "#" },
        { name: "Articles", href: "#" },
        { name: "Contacts", href: "#" },
      ],
    },
    {
      title: "Kontakt",
      details: [
        { label: "Nr Telefonu", value: "123-123-123" },
        { label: "Email", value: "marthurt@gmail.com" },
        {
          label: "Adres",
          value: "Ul. Bartycka 24/26 Paw 224 00-716 WARSZAWA",
        },
      ],
    },
  ],
};

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white py-8">
      <div className="container mx-auto px-4 space-y-6 md:space-y-0 md:flex md:justify-between">
        <div className="space-y-4 md:w-1/5">
          <h2 className="text-4xl font-bold">Mart-Hurt</h2>
          <div className="flex space-x-4">
            {sectionsData.socialLinks.map((link, index) => (
              <Link key={index} href={link.href}>
                <FontAwesomeIcon
                  icon={iconMap[link.icon]}
                  className="hover:text-slate-400 transition-transform transform hover:scale-105 duration-300"
                />
              </Link>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap space-y-6 md:space-y-0 md:space-x-8 md:w-3/4">
          {sectionsData.sections.map((section, index) => (
            <div key={index} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/5">
              <h3 className="font-bold text-3xl mb-4">{section.title}</h3>
              {section.links ? (
                <ul className="space-y-2 text-sm pl-1">
                  {section.links.map((link, idx) => (
                    <li
                      key={idx}
                      className="hover:text-slate-400 transition-transform transform hover:scale-105 duration-300"
                    >
                      <a href={link.href}>{link.name}</a>
                    </li>
                  ))}
                </ul>
              ) : (
                <ul className="space-y-2 text-sm pl-1">
                  {section.details?.map((detail, idx) => (
                    <li key={idx}>
                      <strong>{detail.label}: </strong>
                      {detail.value}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="container mx-auto mt-8 text-center border-t border-gray-700 pt-4">
        <p className="text-xs">&copy;2024 Marthurt</p>
      </div>
    </footer>
  );
};

export default Footer;
