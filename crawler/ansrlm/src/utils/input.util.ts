export const isValidForOctokit = (input: string) => {
  const regex = /^[A-Za-z0-9\-_]+\/[A-Za-z0-9\-_]+$/;
  return regex.test(input);
};

export const getOctokitProps = (input: string) => {
  const inputArray = input.split('/');
  return {owner: inputArray[0], repo: inputArray[1]};
};
