import React, { useEffect, useState } from "react";

const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState('');
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);
        return () => {
            clearTimeout(handler);
        }
    })
    return debouncedValue;
}

export default useDebounce;