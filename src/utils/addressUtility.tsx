export const truncateAddress = (address: string, maxLength: number) => {
    if (address.length <= maxLength) {
        return address; // Return the full address if it's shorter than the maximum length
    }

    const charsToShow = maxLength - 5; // 5 accounts for '0x...' and the ellipsis ('...')
    const front = Math.floor(charsToShow / 2); // Show half characters from the front
    const back = Math.ceil(charsToShow / 2); // Show the remaining characters from the back

    return `${address.slice(0, front)}...${address.slice(-back)}`;
};

// Example usage in a React component
export const AddressDisplay = ({ address, maxLength }: { address: string, maxLength: number }) => {
    return (
        <p>
            {truncateAddress(address, maxLength)}
        </p>
    );
};