export const getRecord = () => {
  const records = JSON.parse(localStorage.getItem("data") as string);
  const recordRef = {
    index: 0,
    count: Infinity,
  };

  records["data"].forEach(
    (item: { data: string; count: number }, index: number) => {
      console.log(item);

      if (item.count < recordRef.count) {
        recordRef.count = item.count;
        recordRef.index = index;
      }
    }
  );

  return recordRef;
};
