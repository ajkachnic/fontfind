/**
 * A variant of a font from google fonts
 */
export type FontVariant = 
  'regular' 
  | 'italic'
  | '100' 
  | '200' 
  | '300' 
  | '400' 
  | '500' 
  | '600' 
  | '700' 
  | '800' 
  | '900'
  | '100italic' 
  | '200italic' 
  | '300italic' 
  | '400italic' 
  | '500italic' 
  | '600italic' 
  | '700italic' 
  | '800italic' 
  | '900italic'

// Thanks stackoverflow
type PartialRecord<K extends keyof any, T> = {
  [P in K]?: T;
};

/**
 * A font sourced from https://fonts.google.com  */
export interface Font {
  family: string,
  version: string,
  lastModified: string,
  variants: FontVariant[],
  files: PartialRecord<FontVariant, string>
}

const isNode = typeof window === 'undefined'