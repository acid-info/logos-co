/**
 * Shared lookup helper for sections returned by `getPageCopy`.
 *
 * Each `pages.<route>.json` document is loaded into a `sections` array, and
 * page components need to pick out specific entries by `componentType` + `key`.
 * This helper centralises that lookup so callers get a typed result and a
 * consistent error message when a referenced section is missing.
 *
 * Usage:
 *   const findSection = createSectionFinder('blockchain')
 *   const hero = findSection<HeroSection>(page.sections, 'hero', 'blockchain.hero')
 */

type SectionLike = { componentType: string; key: string }

export type SectionFinder = <T extends SectionLike>(
  sections: ReadonlyArray<SectionLike>,
  componentType: T['componentType'],
  key: string,
) => T

/**
 * Build a `findSection` lookup bound to a page name. The returned function
 * throws a descriptive error if the requested section is missing — pages
 * assume their copy document is well-formed at build time.
 */
export function createSectionFinder(pageName: string): SectionFinder {
  return <T extends SectionLike>(
    sections: ReadonlyArray<SectionLike>,
    componentType: T['componentType'],
    key: string,
  ): T => {
    const found = sections.find(
      (s) => s.componentType === componentType && s.key === key,
    )
    if (!found) {
      throw new Error(
        `${pageName} page section not found: ${componentType} "${key}"`,
      )
    }
    return found as T
  }
}
