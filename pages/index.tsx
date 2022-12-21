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
import { Footer } from "../src/components/Footer";
import { getAllProjects } from "../src/repository/projects";
import { getAboutMeSection } from "../src/repository/personal";

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
    projects = await getAllProjects();
    aboutMeSection = await getAboutMeSection();
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
    <div className="flex flex-col md:flex-row-reverse">
      <ModalContextProvider>
        <Head>
          <title>Ernest Przybył - IT specialist</title>
          <meta
            name="description"
            content="Hi. I'm Full stack developer located in Poland.  Currently I'm studying at the Politechnika Wrocławska (PWR) at the faculty &quotInformatyka i zarządanie&quot I used to work as JavaScript developer but I also enjoy C#, GO and others. Feel free to chekout my website."
          />
          <meta
            name="keywords"
            content="Frontend, Backend, Developer, Javascript, .NET, Web, IT"
          />
          <meta name="author" content="Ernest Przybył"></meta>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <WindowScrollProgres />
        <div className="flex-grow">
          <Banner title="Hi I'm Ernest Przybył, a web developer" />
          <TrackableSectionContainer
            activeSectionSelectionStrategy={selectElementVisableInBottom}
            onActiveSectionChange={setActiveSectionId}
          >
            <div className="p-7 pb-24 overflow-hidden">
              {aboutMeSection && (
                <TrackableSection id="AboutMe">
                  <Section title="AboutMe">
                    <MarkdownSection content={aboutMeSection.content} />
                  </Section>
                  <div className="divider"></div>
                </TrackableSection>
              )}
              <TrackableSection id="Projects">
                <Section title="Sample projects">
                  <ProjectContainer>
                    {projects.map((project) => (
                      <ProjectCard project={project} key={project.id} />
                    ))}
                  </ProjectContainer>
                </Section>
                <div className="divider"></div>
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
          <Footer />
        </div>
        <BottomNav actions={navActions} className="md:hidden"></BottomNav>
        <SideNav actions={navActions} className="hidden md:flex"></SideNav>
      </ModalContextProvider>
    </div>
  );
};

export default Home;
