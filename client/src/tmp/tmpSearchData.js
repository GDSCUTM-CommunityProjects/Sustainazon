const generateTmpData = () => {
  const tmpData = [];
  for (let i = 0; i < 5; i++) {
    tmpData.push({
      id: i,
      itemName: "Faux Leather Backpack",
      price: 65.99,
      imgUrl: "https://github.com/hiimchrislim.png",
      imgAlt: "Faux Leather Backpack",
      tag: "Handmade Bags",
      rating: Math.random() * (5 - 0 + 1) + 0,
      numReviews: Math.floor(Math.random() * (50 - 0 + 1) + 0),
    });
  }
  return tmpData;
};
export const tmpSearchData = generateTmpData();
