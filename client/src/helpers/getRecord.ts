/**
 * Search for the record with the smallest count.
 */
export const getRecord = () => {
  const records = JSON.parse(localStorage.getItem("data") as string);

  // Store item reference.
  const recordRef = {
    index: 0,
    count: Infinity,
  };

  // Search for the record with the smallest count.
  records["data"].forEach(
    (item: { data: string; count: number }, index: number) => {
      if (item.count < recordRef.count) {
        recordRef.count = item.count;
        recordRef.index = index;
      }
    }
  );

  // Update count for the selected item.
  records["data"][recordRef.index].count += 1;
  localStorage.setItem("data", JSON.stringify(records));

  return records["data"][recordRef.index];
};
