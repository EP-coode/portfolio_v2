import { ActiveSectionSelectionStrategy } from "../components/trackableSection/TrackableSectionContainer";

export const selectElementVisableInBottom: ActiveSectionSelectionStrategy = (
  registeredSections,
  visableSections
) => {
  const sortedRefsAndIds = Object.entries(registeredSections)
    .filter(([sectionId]) => visableSections.has(sectionId))
    .sort(([, section1], [, section2]) => {
      const el1YPos = section1.current?.getBoundingClientRect().y ?? 0;
      const el2YPos = section2.current?.getBoundingClientRect().y ?? 0;

      if (el1YPos < el2YPos) return 1;
      else if (el1YPos > el2YPos) return -1;
      else return 0;
    });

  if (sortedRefsAndIds.length == 0) return null;
  
  return sortedRefsAndIds[0][0];
};
