export default function isValidFileName(fileName: string) {
  // Define a regular expression to match invalid characters in a file name
  const invalidCharsRegex = /[<>:"\/\\|?*\x00-\x1F]/g;

  // Check if the file name contains any invalid characters
  if (invalidCharsRegex.test(fileName)) {
    return false;
  }

  // If the file name passes all checks, it's considered valid
  return true;
}
