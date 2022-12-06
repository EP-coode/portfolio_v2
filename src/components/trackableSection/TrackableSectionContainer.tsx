import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from "react";
import { selectElementVisableInBottom } from "../../utils/activeSectionSelectionStrategies";

interface SectionContext {
  registredSections: RegistredSections;
  registerSection: (
    sectionId: string,
    sectionRef: React.RefObject<HTMLElement>
  ) => void;
}

type RegistredSections = { [key: string]: React.RefObject<HTMLElement> };

export type ActiveSectionSelectionStrategy = (
  sections: RegistredSections,
  visableSectionIds: Set<string>
) => string | null;

interface ContextProviderProps extends PropsWithChildren {
  activeSectionSelectionStrategy: ActiveSectionSelectionStrategy;
  onActiveSectionChange: (activeSectionId: string | null) => void;
}

export const SectionContext = createContext<SectionContext | null>(null);

export const TrackableSectionContainer = ({
  children,
  onActiveSectionChange,
  activeSectionSelectionStrategy = selectElementVisableInBottom,
}: ContextProviderProps) => {
  const [registeredSections, setRegisteredSections] =
    useState<RegistredSections>({});
  const [visableScetionsIds, setVisableSectionsIds] = useState<Set<string>>(
    new Set()
  );

  const handleSectionRegister = useCallback(
    (sectionId: string, sectionRef: React.RefObject<HTMLElement>) => {
      setRegisteredSections((prev) => ({ ...prev, [sectionId]: sectionRef }));
    },
    []
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisableSectionsIds((prev) => new Set(prev.add(entry.target.id)));
          } else {
            setVisableSectionsIds((prev) => {
              const newValue = new Set(prev);
              newValue.delete(entry.target.id);
              return newValue;
            });
          }
        });
      },
      {
        rootMargin: "0px 0px -100px",
      }
    );

    Object.entries(registeredSections).forEach(([, sectionRef]) => {
      if (sectionRef.current != null) {
        observer.observe(sectionRef.current);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [registeredSections]);

  useEffect(() => {
    const newActiveSection = activeSectionSelectionStrategy(
      registeredSections,
      visableScetionsIds
    );
    onActiveSectionChange(newActiveSection);
  }, [visableScetionsIds, registeredSections]);

  return (
    <SectionContext.Provider
      value={{
        registerSection: handleSectionRegister,
        registredSections: registeredSections,
      }}
    >
      {children}
    </SectionContext.Provider>
  );
};
