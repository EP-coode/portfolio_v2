import React, {
  createContext,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";

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
  onActiveSectionChange: (activeSectionId: string | undefined) => void;
}

const defaultSectionInViewContext: SectionContext = {
  sectionsInView: [],
  activeSection: undefined,
};

export const SectionContext = createContext<SectionContext>(
  defaultSectionInViewContext
);

/**
 * Thist sollution has realy bad complexity
 * Bigger ammunt of elements in viewport may caouse 
 * performance issues
 * I was unable to get references to those objects
 * I was trying:
 * * using querySelectorAll to get childs to track
 *   This one won't work becouse childrens can update
 * * Children.map(children,...)
 *   This one won't work becaouse you need extra DOM element
 *   to wrap each children and get reference. May caouse unwanted
 *   problems with styling and others. (child props can't be mutated
 *   to pass merged references)
 *   This will also allow only first layer of children in tree to 
 *   be tracked.
 * 
 */
export const TrackableSectionContainer = ({
  children,
  selectActiveSection,
  onActiveSectionChange,
}: ContextProviderProps) => {
  const [sectionsInView, setSectionsInView] = useState<
    React.RefObject<HTMLElement>[]
  >([]);
  const [activeSection, setActiveSection] =
    useState<React.RefObject<HTMLElement>>();

  useEffect(() => {
    onActiveSectionChange(activeSection?.current?.id);
  }, [activeSection]);

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
