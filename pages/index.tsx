import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import Head from "next/head";
import { Suspense, useEffect, useState } from "react";
import Banner from "../src/components/Banner";
import { MarkdownSection } from "../src/components/MarkdownSection";
import { TrackableSectionContainer } from "../src/components/trackableSection/TrackableSectionContainer";
import { TrackableSection } from "../src/components/trackableSection/TrackableSection";
import { selectElementVisableInBottom } from "../src/utils/activeSectionSelectionStrategies";
import { Section } from "../src/components/Section";
import { ModalContextProvider } from "../src/context/ModalContext";
import { Project } from "../src/model/Project";
import { ProjectCard } from "../src/components/project/ProjectCard";
import { ProjectContainer } from "../src/components/project/ProjectContainer";
import dynamic from "next/dynamic";
import { LoadingPlaceholder } from "../src/components/LoadingPlaceholder";
import { getAllProjects } from "../src/repository/projects";
import { getAboutMeSection } from "../src/repository/personal";
import { WorkExperienceEntry } from "../src/model/WorkExperienceEntry";
import { getAllWorkExperienceEntries } from "../src/repository/workExperience";
import { TimeLine } from "../src/components/timeline/TimeLine";

const ContactMeForm = dynamic(() => import("../src/components/ContactMeForm"), {
  suspense: true,
  ssr: false,
});

type IndexPageProps = {
  aboutMeSection: { content: string; data: { title: string } };
  projects: Project[];
  workExperienceEntries: WorkExperienceEntry[];
};

export const getStaticProps: GetStaticProps<IndexPageProps> = async () => {
  let aboutMeSection;
  let projects: Project[] = [];
  let workExperienceEntries: WorkExperienceEntry[] = [];

  try {
    [projects, aboutMeSection, workExperienceEntries] = await Promise.all([
      getAllProjects(),
      getAboutMeSection(),
      getAllWorkExperienceEntries(),
    ]);
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
      workExperienceEntries,
    },
  };
};

const Home: NextPage<
  InferGetStaticPropsType<typeof getStaticProps> & {
    setActiveActionId: (actionId: string | null | undefined) => void;
  }
> = ({
  aboutMeSection,
  projects,
  workExperienceEntries,
  setActiveActionId,
}) => {
  const [activeSectionId, setActiveSectionId] = useState<string | null>();

  useEffect(() => {
    setActiveActionId(activeSectionId);
  }, [activeSectionId]);

  return (
    <div className="flex flex-col md:flex-row-reverse">
      <ModalContextProvider>
        <Head>
          <title>Ernest Przybył - IT specialist</title>
          <meta
            name="description"
            content="Hi. I'm Full stack developer located in Poland. Currently I'm studying at the Politechnika Wrocławska (PWR) at the faculty &quotInformatyka i zarządanie&quot I used to work as JavaScript developer but I also enjoy C#, GO and others. Feel free to chekout my website."
          />
          <meta
            name="keywords"
            content="Frontend, Backend, Developer, Javascript, .NET, Web, IT, portfolio"
          />
        </Head>
        <div className="flex-grow">
          <Banner title="Hi I'm Ernest Przybył, a web developer" />
          <TrackableSectionContainer
            activeSectionSelectionStrategy={selectElementVisableInBottom}
            onActiveSectionChange={setActiveSectionId}
          >
            <div className="p-7">
              {aboutMeSection && (
                <TrackableSection id="AboutMe">
                  <Section title="AboutMe">
                    <MarkdownSection
                      content={aboutMeSection.content}
                      className="prose-lg"
                    />
                  </Section>
                  <div className="divider"></div>
                </TrackableSection>
              )}
              {workExperienceEntries && (
                <TrackableSection id="Experience">
                  <Section title="Comercial experience">
                    <div className="my-3">
                      <TimeLine
                        entries={workExperienceEntries.map((e, i) => ({
                          description: e.description,
                          timeLabel: `${e.from} - ${e.to ?? "now"}`,
                          id: i,
                          link: { label: e.company, link: e.company_link },
                          title: e.position,
                        }))}
                      />
                    </div>
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
        </div>
      </ModalContextProvider>
    </div>
  );
};

export default Home;
