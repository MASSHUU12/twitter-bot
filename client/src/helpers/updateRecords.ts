/**
 * Edit specific record.
 *
 * @param text string
 * @param index number
 */
export const updateRecords = (text: string, index: number): void => {
  const records: { data: [{ data: string[]; count: number }] } = JSON.parse(
    localStorage.getItem("data") as string
  );

  // Edit record.
  records["data"][index].data = text.split("\n");

  // Save records.
  localStorage.setItem("data", JSON.stringify(records));
};
