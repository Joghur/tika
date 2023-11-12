import { FieldItemType } from "@/components/Stadium";

export const updateArray = (obj: FieldItemType, array: FieldItemType[]) => {
  const indexToUpdate = array.findIndex((item) => item.id === obj.id);
  const newArr = [...array];

  if (indexToUpdate !== -1) {
    newArr[indexToUpdate] = obj;
    console.log("Object updated:", obj);
  } else {
    console.log("Object not found for update.");
  }
  return newArr;
};

export const removeNullProperties = (array: any) => {
  return array.map((obj: any) => {
    const newObj = {};
    for (const key in obj) {
      if (obj[key] !== null) {
        newObj[key] = obj[key];
      }
    }
    return newObj;
  });
};
