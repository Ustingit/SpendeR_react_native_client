export const DIRECTIONS = [
    { key: 0, value: "Outcome" },
    { key: 1, value: "Income" },
];

export function getDirectionNameById(id) {
    var result = DIRECTIONS.find(x => x.key === id);

    if (result) {
        return result.value;
    }

    console.log(`===> direction with id ${id} was not found`);
    return "Unknown direction";
}