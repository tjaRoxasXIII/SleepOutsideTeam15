// validator.js
export default function validateCheckoutForm(form) {
    // List of required fields with custom error messages
    const requiredFields = [
        { id: 'fname', message: 'Please enter your first name.' },
        { id: 'lname', message: 'Please enter your last name.' },
        { id: 'street', message: 'Please enter your street address.' },
        { id: 'city', message: 'Please enter your city.' },
        { id: 'state', message: 'Please enter your state.' },
        { id: 'zip', message: 'Please enter your zip code.' },
        { id: 'cardNumber', message: 'Please enter your credit card number.' },
        { id: 'expiration', message: 'Please enter the expiration date.' },
        { id: 'code', message: 'Please enter the security code.' }
    ];

    // Check each field to ensure it is not empty
    for (let field of requiredFields) {
        const input = document.getElementById(field.id);
        if (!input || !input.value.trim()) {
            alert(field.message);
            if (input) input.focus();
            return false; // Stop validation on first error
        }
    }
    return true; // All fields passed validation
}