const generateTmpData = () => {
  const tmpData = [];
  for (let i = 0; i < 15; i++) {
    tmpData.push({
      itemName: "Faux Leather Backpack",
      price: 65.99,
      imgUrl: "https://github.com/hiimchrislim.png",
      imgAlt: "Faux Leather Backpack",
      tag: "Handmade Bags",
    });
  }
  return tmpData;
};
export const tmpSearchData = generateTmpData();
