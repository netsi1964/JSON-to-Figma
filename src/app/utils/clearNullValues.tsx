export default function clearNullValues(obj) {
    const jsonString = JSON.stringify(obj, (_, value) => {
        if (value !== null) return value;
    });

    return JSON.parse(jsonString);
}
