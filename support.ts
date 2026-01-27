import 'dotenv/config';
import * as fs from 'fs';
import * as path from 'path';

export function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing env: ${name}`);
  }
  return value;
}

/**
 * Creates a filtered storageState file containing only the specified cookie
 * @param sourceStorageStatePath - Path to the original storageState.json file
 * @param cookieName - Name of the cookie to filter (e.g., 'PrestaShop-bd73d297b14c5070734013be8110710b')
 * @param outputPath - Optional path for the filtered storageState file. Defaults to 'filteredStorageState.json' in project root
 * @returns Path to the filtered storageState file
 */
export function createFilteredStorageState(
  sourceStorageStatePath: string = './storageState.json',
  cookieName: string = 'PrestaShop-bd73d297b14c5070734013be8110710b',
  outputPath: string = './filteredStorageState.json'
): string {
  const fullSourcePath = path.resolve(sourceStorageStatePath);
  
  if (!fs.existsSync(fullSourcePath)) {
    throw new Error(`StorageState file not found: ${fullSourcePath}`);
  }

  const storageState = JSON.parse(fs.readFileSync(fullSourcePath, 'utf-8'));

  // Filter to only include the specified cookie
  const filteredCookies = storageState.cookies.filter(
    (cookie: { name: string }) => cookie.name === cookieName
  );

  // Create filtered storageState object
  const filteredStorageState = {
    cookies: filteredCookies,
    origins: storageState.origins || [],
  };

  // Write filtered storageState to file
  const fullOutputPath = path.resolve(outputPath);
  fs.writeFileSync(fullOutputPath, JSON.stringify(filteredStorageState, null, 2));

  return fullOutputPath;
}
