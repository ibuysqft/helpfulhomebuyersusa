export interface StateContent {
  /** 3–4 sentence legal-context paragraph, specific to state × situation */
  legalBlock: string
  /** City slug → 2-sentence hyperlocal opener. Present for top 20 cities per state. */
  cityIntros: Record<string, string>
}
