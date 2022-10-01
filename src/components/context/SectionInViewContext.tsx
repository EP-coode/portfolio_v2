import React, { createContext, PropsWithChildren, useState } from "react";

interface SectionContext {
  sectionsInView: React.RefObject<HTMLElement>[];
  activeSection: React.RefObject<HTMLElement> | undefined;
  onSectionEnter?: (sectionRef: React.RefObject<HTMLElement>) => void;
  onSectionLeave?: (sectionRef: React.RefObject<HTMLElement>) => void;
}

interface ContextProviderProps extends PropsWithChildren {
  selectActiveSection: (
    sectionsRef: React.RefObject<HTMLElement>[]
  ) => React.RefObject<HTMLElement> | undefined;
}

const defaultSectionInViewContext: SectionContext = {
  sectionsInView: [],
  activeSection: undefined,
};

export const SectionContext = createContext<SectionContext>(
  defaultSectionInViewContext
);

export const SectionContextProvider = ({
  children,
  selectActiveSection,
}: ContextProviderProps) => {
  const [sectionsInView, setSectionsInView] = useState<
    React.RefObject<HTMLElement>[]
  >([]);
  const [activeSection, setActiveSection] =
    useState<React.RefObject<HTMLElement>>();

  const onSectionEnter = (sectionRef: React.RefObject<HTMLElement>) => {
    if (!sectionsInView.includes(sectionRef)) {
      const _sectionsInView = [...sectionsInView, sectionRef];
      const _activeSection = selectActiveSection(_sectionsInView);

      if (activeSection != _activeSection) {
        setActiveSection(_activeSection);
      }

      setSectionsInView(_sectionsInView);
    }
  };

  const onSectionLeave = (sectionRef: React.RefObject<HTMLElement>) => {
    const _sectionsInView = sectionsInView.filter(
      (sectionRefInArr) => sectionRefInArr != sectionRef
    );
    const _activeSection = selectActiveSection(_sectionsInView);

    if (activeSection != _activeSection) {
      setActiveSection(_activeSection);
    }

    setSectionsInView(_sectionsInView);
  };

  return (
    <SectionContext.Provider
      value={{
        sectionsInView,
        activeSection,
        onSectionEnter,
        onSectionLeave,
      }}
    >
      {children}
    </SectionContext.Provider>
  );
};
