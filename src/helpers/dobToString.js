
function dobToString(dob) {
    const date = new Date(dob);

    const options = {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'

    };

    return date.toLocaleDateString('nl-NL', options); // Change 'en-US' to whatever locale you need
}

export default dobToString;