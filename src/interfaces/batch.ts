interface PrintOpts {
  format?: string;
  landscape?: boolean;
  printBackground?: boolean;
  scale?: number;
}

/**
 * @example {
 *  "ref": "https://example.com",
 *  "printOpts": {
 *    "format": "A4",
 *    "landscape": false,
 *    "printBackground": true,
 *    "scale": 1
 *   }
 * }
 */
export interface BatchRequest {
  ref: string;
  printOpts?: PrintOpts;
}

export interface BatchOptions {
  id?: number;
  url?: string;
  auth?: string;
}
