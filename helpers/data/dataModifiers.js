const groupKeyName = "name";
const groupDateName = "items";

//TODO: do it generic (prvode the grouping key as a parameter)
export const groupDataByDate = (data) => Object.values(data.reduce((spd, item) => {
    if (!spd[item.date]) spd[item.date] = {
        [groupKeyName]: item.date,
        [groupDateName]: []
    };

    spd[item.date].items.push(item);
    return spd;
}, {}));

export const addItemToGroupedArray = (groupedArray, newItem) => {
    var flatArray = [];

    groupedArray.forEach((item) => {
        item.items.forEach((x) => {
            flatArray.push(x);
        })
    });

    flatArray.push(newItem);

    return groupDataByDate(flatArray);
}

export const deleteItemByIdFromGroupedArray = (groupedArray, id) => {
    var result = [...groupedArray];

    result.forEach((sp) => {
      sp.items = sp.items.filter(x => x.id !== id);
    }); 

    return result.filter(sp => sp.items.length > 0);
}

export const updateItemInGroupedArray = (groupedArray, updatedItem) => {
    if (!updatedItem) { return groupedArray; }

    var result = [...groupedArray];
    result.forEach((group) => {
        group.items.forEach((x) => {
            if (x.id === updatedItem.id) {
                x.comment = updatedItem.comment;
                x.amount = updatedItem.amount;
                x.date = updatedItem.date;
                x.isCommon = updatedItem.isCommon;
            }
        });
    })
    
    return result;
}