import fs from "fs";
import classNames from "classnames";
import matter from "gray-matter";
import type { InferGetServerSidePropsType, NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { SideNav, BottomNav } from "../src/components/nav";
import Banner from "../src/components/Banner";
import { MarkdownSection } from "../src/components/MarkdownSection";
import WindowScrollProgres from "../src/components/WindowScrollProgres";
import { SectionContextProvider } from "../src/context/SectionInViewContext";
import useMatchMaxWidth from "../src/hooks/useMatchMaxWidth";
import { CirclePersonIcon, WorkerIcon } from "../src/icons";
import Section from "../src/layout/Section";
import { selectElementVisableInBottom } from "../src/utils/activeSectionSelectionStrategies";
import { scroolIntoViewById } from "../src/utils/scroolIntoViewById";

export async function getStaticProps() {
  let aboutMeSection;

  try {
    const readFile = fs.readFileSync(`content/aboutme.md`, "utf-8");
    const { data, content } = matter(readFile);
    aboutMeSection = {
      data,
      content,
    };
  } catch (e) {
    console.error(e);
  }

  return {
    props: {
      aboutMeSection,
    },
  };
}

const Home: NextPage<
  InferGetServerSidePropsType<typeof getStaticProps>
> = ({ aboutMeSection }) => {
  const displayMobileNav = useMatchMaxWidth("600px");
  const [activeSectionId, setActiveSectionId] = useState<string>();
  const Nav = displayMobileNav ? BottomNav : SideNav;

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <WindowScrollProgres />
      <div
        className={classNames("flex", {
          "flex-col": displayMobileNav,
          "flex-row-reverse": !displayMobileNav,
        })}
      >
        <div className="flex-grow">
          <Banner title="Hi I'm Ernest, a web developer" />
          <SectionContextProvider
            selectActiveSection={selectElementVisableInBottom}
            onActiveSectionChange={(sectionId) => setActiveSectionId(sectionId)}
          >
            <div className="p-7 pb-24 overflow-hidden">
              {aboutMeSection && (
                <Section title={aboutMeSection.data.title} name={"AboutMe"}>
                  <MarkdownSection content={aboutMeSection.content} />
                </Section>
              )}
              {aboutMeSection && (
                <Section title={"Projects"} name={"Projects"}>
                  <MarkdownSection content={aboutMeSection.content} />
                </Section>
              )}
              {aboutMeSection && (
                <Section title={"Contact"} name={"Contact"}>
                  <MarkdownSection content={aboutMeSection.content} />
                </Section>
              )}
            </div>
          </SectionContextProvider>
        </div>
        <Nav
          actions={[
            {
              icon: <CirclePersonIcon />,
              label: "AboutMe",
              isActive: activeSectionId == "AboutMe",
              action: () => scroolIntoViewById("AboutMe"),
            },
            {
              icon: <WorkerIcon />,
              label: "Projects",
              isActive: activeSectionId == "Projects",
              action: () => scroolIntoViewById("Projects"),
            },
            {
              icon: <CirclePersonIcon />,
              label: "Contact",
              isActive: activeSectionId == "Contact",
              action: () => scroolIntoViewById("Contact"),
            },
          ]}
        ></Nav>
      </div>
    </div>
  );
};

export default Home;
