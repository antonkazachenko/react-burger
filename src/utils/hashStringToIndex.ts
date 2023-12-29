function hashStringToIndex(str: string, arrayLength: number): number {
  let hash = 0;
  for (let i = 0; i < str.length; i += 1) {
    const char = str.charCodeAt(i);
    hash = (hash + char) % arrayLength;
  }
  return hash;
}

export default hashStringToIndex;
