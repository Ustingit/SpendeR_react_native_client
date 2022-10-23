
//TODO: do it generic (prvode the grouping key as a parameter)
export const groupDataByDate = (data) => Object.values(data.reduce((spd, item) => {
    if (!spd[item.date]) spd[item.date] = {
        name: item.date,
        items: []
    };
    spd[item.date].items.push(item);
    return spd;
  }, {}));
