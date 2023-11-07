export function sortByProperty(property, direction) {
    if (direction) {
        return (a, b) => {
            return a[property] > b[property] ? 1 : -1;
          };
    } else {
        return (a, b) => {
            return a[property] < b[property] ? 1 : -1;
          };
    }
}