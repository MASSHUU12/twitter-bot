/**
 * Delete specific record.
 */
export const deleteRecord = (id: number): void => {
  const records: { data: [{ data: string; count: number }] } = JSON.parse(
    localStorage.getItem("data") as string
  );

  // Remove element.
  records["data"].splice(id, 1);

  // Save new records.
  localStorage.setItem("data", JSON.stringify(records));
};
