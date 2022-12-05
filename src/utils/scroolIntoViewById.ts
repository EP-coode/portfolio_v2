export const scroolIntoViewById = (elementId: string, scroolYOffset = -50) => {
  if (!document || !window) return;

  const element = document.querySelector(`#${elementId}`);

  if (!element) return;

  const y =
    element.getBoundingClientRect().top + window.pageYOffset + scroolYOffset;

  window.scrollTo({ top: y, behavior: "smooth" });
};
