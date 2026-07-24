// validator.js
export default function validateCheckoutForm(form) {
    // Lista de campos obligatorios con su mensaje personalizado
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

    for (let field of requiredFields) {
        const input = document.getElementById(field.id);
        if (!input || !input.value.trim()) {
            alert(field.message);
            if (input) input.focus();
            return false;
        }
    }
    return true;
}