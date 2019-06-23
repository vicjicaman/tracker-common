export const getGroupChanges = (files) => {

  const res = {}
  for (const file of files) {
    const {fileid, staged, status} = file;

    const comps = fileid.split("/");

    let current = res;
    for (const comp of comps) {
      if (!current[comp]) {
        current[comp] = {};
      }
      current = current[comp];
    }

    current.file = {
      fileid,
      status: status || staged
    };
  }

  return res;
}
