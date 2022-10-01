export const selectElementVisableInBottom = (
  sectionsRef: React.RefObject<HTMLElement>[]
): React.RefObject<HTMLElement> | undefined => {
  const sortedRefs = sectionsRef.sort((section1, section2) => {
    const el1YPos = section1.current?.getBoundingClientRect().y ?? 0;
    const el2YPos = section2.current?.getBoundingClientRect().y ?? 0;

    if (el1YPos < el2YPos) return 1;
    else if (el1YPos > el2YPos) return -1;
    else return 0;
  });

  return sortedRefs[0];
};
