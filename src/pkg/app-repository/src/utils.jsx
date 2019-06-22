export const isFileStaged = ({staged}) => {
  return [
    "A",
    "M",
    "D",
    "R",
    "C",
    "U"
  ].includes(staged)
}

export const isFileUnstaged = ({unstaged}) => {
  return ["M", "?", "D", "U"].includes(unstaged)
}

export const isFileUnmerge = ({unstaged, staged}) => {
  return staged === "U" || unstaged === "U";
}

export const checkFiles = (files, fn) => {

  for (const file of files) {
    if (fn(file)) {
      return true;
    }
  }

  return false;
}
