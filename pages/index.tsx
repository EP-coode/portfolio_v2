import { promises as fs } from "fs";
import classNames from "classnames";
import matter from "gray-matter";
import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import Head from "next/head";
import { Suspense, useState } from "react";
import { SideNav, BottomNav } from "../src/components/navigation";
import Banner from "../src/components/Banner";
import { MarkdownSection } from "../src/components/MarkdownSection";
import WindowScrollProgres from "../src/components/WindowScrollProgres";
import { TrackableSectionContainer } from "../src/components/trackableSection/TrackableSectionContainer";
import useMatchMaxWidth from "../src/hooks/useMatchMaxWidth";
import { CirclePersonIcon, MailIcon, WorkerIcon } from "../src/icons";
import { TrackableSection } from "../src/components/trackableSection/TrackableSection";
import { selectElementVisableInBottom } from "../src/utils/activeSectionSelectionStrategies";
import { scroolIntoViewById } from "../src/utils/scroolIntoViewById";
import { Section } from "../src/components/Section";
import { ModalContextProvider } from "../src/context/ModalContext";
import { Project } from "../src/model/Project";
import { ProjectCard } from "../src/components/project/ProjectCard";
import { ProjectContainer } from "../src/components/project/ProjectContainer";
import dynamic from "next/dynamic";
import { LoadingPlaceholder } from "../src/components/LoadingPlaceholder";

const ContactMeForm = dynamic(() => import("../src/components/ContactMeForm"), {
  suspense: true,
  ssr: false,
});

type IndexPageProps = {
  aboutMeSection: { content: string; data: { title: string } };
  projects: Project[];
};

export const getStaticProps: GetServerSideProps<IndexPageProps> = async () => {
  let aboutMeSection;
  let projects: Project[] = [];

  try {
    const readFile = await fs.readFile(`content/aboutme.md`, "utf-8");
    const { data, content } = matter(readFile);
    aboutMeSection = {
      data: data as { title: string },
      content,
    };

    const projectsDir = await fs.readdir("content/projects");

    projects = await Promise.all(
      projectsDir.map(async (fileName) => {
        const readFile = await fs.readFile(
          `content/projects/${fileName}`,
          "utf-8"
        );
        const { data, content } = matter(readFile);
        const project: Project = {
          id: data.id ?? null,
          title: data.title ?? null,
          images: data.images ?? null,
          live_sample_link: data.live_sample_link ?? null,
          repo_link: data.repo_link ?? null,
          teaser: data.teaser ?? null,
          technologies: data.technologies ?? null,
          content,
        };
        return project;
      })
    );

    projects.sort((p1, p2) => (p1 < p2 ? -1 : p1 > p2 ? 1 : 0));
  } catch (e) {
    console.error(e);
    return {
      notFound: true,
    };
  }

  return {
    props: {
      aboutMeSection,
      projects,
    },
  };
};

const Home: NextPage<InferGetServerSidePropsType<typeof getStaticProps>> = ({
  aboutMeSection,
  projects,
}) => {
  const [activeSectionId, setActiveSectionId] = useState<string | null>();

  const navActions = [
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
      icon: <MailIcon />,
      label: "Contact",
      isActive: activeSectionId == "Contact",
      action: () => scroolIntoViewById("Contact"),
    },
  ];

  return (
    <div>
      <ModalContextProvider>
        <Head>
          <title>Ernest Przybył</title>
          <meta name="description" content="Portfolio of Ernest Przybył" />
          <meta
            name="keywords"
            content="Frontend, Backend, Developer, Js, Javascript, portfilio"
          />
          <meta name="author" content="Ernest Przybył"></meta>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <WindowScrollProgres />
        <div className="flex flex-col md:flex-row-reverse">
          <div className="flex-grow">
            <Banner title="Hi I'm Ernest Przybł, a web developer" />
            <TrackableSectionContainer
              activeSectionSelectionStrategy={selectElementVisableInBottom}
              onActiveSectionChange={(sectionId) =>
                setActiveSectionId(sectionId)
              }
            >
              <div className="p-7 pb-24 overflow-hidden">
                {aboutMeSection && (
                  <TrackableSection id="AboutMe">
                    <Section title="AboutMe">
                      <MarkdownSection content={aboutMeSection.content} />
                    </Section>
                  </TrackableSection>
                )}
                <TrackableSection id="Projects">
                  <Section title="Projects">
                    <ProjectContainer>
                      {projects.map((project) => (
                        <ProjectCard project={project} key={project.id} />
                      ))}
                    </ProjectContainer>
                  </Section>
                </TrackableSection>
                <TrackableSection id="Contact">
                  <Section title="Contact" className="min-h-[20rem]">
                    <Suspense fallback={<LoadingPlaceholder />}>
                      <ContactMeForm />
                    </Suspense>
                  </Section>
                </TrackableSection>
              </div>
            </TrackableSectionContainer>
          </div>
          <BottomNav actions={navActions} className="md:invisible"></BottomNav>
          <SideNav actions={navActions} className="invisible md:visible"></SideNav>
        </div>
      </ModalContextProvider>
    </div>
  );
};

export default Home;
