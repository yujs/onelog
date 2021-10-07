export interface ExtendedError extends Error {
  filename:string;
  lineno:number;
  colno:number;
}
