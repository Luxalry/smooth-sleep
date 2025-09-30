/**
 * ==================================================================================
 * SCRIPT RESTRUCTURED
 * ==================================================================================
 * Description: This script handles the functionality of a product landing page,
 * including multi-language support, a multi-step checkout modal, form validation,
 * data submission to Google Sheets, and analytics tracking.
 *
 * Re-organized by: Gemini
 * Date: 2024-05-22
 *
 * --- TABLE OF CONTENTS ---
 * 1. CONFIGURATION & CONSTANTS
 * 2. STATE VARIABLES
 * 3. TRACKING & ANALYTICS
 * 4. UI LOGIC & DOM MANIPULATION
 * - Language & Translation
 * - Checkout Modal Management
 * - Confirmation Dialog
 * - Popup Blocker Monitor
 * - General UI Components (Header, FAQ)
 * 5. CORE APPLICATION LOGIC
 * - Form Validation & Submission
 * - Multi-Step Navigation
 * 6. INITIALIZATION (ON DOM CONTENT LOADED)
 * ==================================================================================
 */

// ==================================================================================
// 1. CONFIGURATION & CONSTANTS
// ==================================================================================

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwDyvrE3gVhvxUPiXLwk_M_p_z-vO1acq2nljXK10HonrJCkne00zNIKhx7lecE5cc2ug/exec';
const SELLER_WHATSAPP_NUMBER = '212768356015';
const CURRENCY_SYMBOL = 'MAD';

const TRANSLATIONS = {
    en: {
        CompleteOrder: "Complete Your Order",
        FillDetails: "Fill out the details below to checkout.",
        ProductDetails: "Product Details",
        ProductName: "Smooth Sleep",
        Quantity: "Quantity",
        SelectQuantity: "Select a quantity",
        Bottle1: "1 Bottle",
        Bottle3: "3 Bottles",
        Bottle5: "5 Bottles",
        YourDetails: "Your Details",
        FullName: "Full Name",
        FullNamePlaceholder: "Enter Your Name*",
        PhoneNumber: "Phone Number",
        PhoneNumberPlaceholder: "+212 600-000000",
        ConfirmPhoneNumber: "Confirm Phone Number",
        ConfirmPhoneNumberPlaceholder: "Re-enter phone number",
        FullAddress: "Full Address",
        FullAddressPlaceholder: "Street, City, etc.",
        ValidPhone: "Please enter a valid phone number.",
        PhoneMismatch: "Phone numbers do not match.",
        SubmitOrder: "Submit Order",
        OrderConfirmed: "Order Confirmed!",
        Redirecting: "Redirecting to WhatsApp...",
        ConfirmDetails: "Please Confirm Your Details",
        OrderID: "Order ID",
        ConfirmName: "Name",
        ConfirmPhone: "Phone",
        ConfirmAddress: "Address",
        ConfirmCallTime: "Consultation Time",
        ConfirmDeliveryNote: "Delivery Note",
        ConfirmQuantity: "Quantity",
        ConfirmPrice: "Price",
        ConfirmCorrect: "Is this information correct?",
        EditButton: "No, Edit",
        ConfirmButton: "Yes, Go!",
        Processing: 'Processing...',
        Next: 'Next',
        Back: 'Back',
        AdditionalInfo: "Additional Info",
        CallTime: "Preferred call time for free consultation",
        DeliveryNote: "Delivery Note (Optional)",
        DeliveryNotePlaceholder: "e.g., leave with the concierge, call upon arrival...",
        ClientNote: "(Client Note): please call me at {time} for consultation and confirmation",
        SellerNote: "(Seller Note): im replacing confirmation call to consultation call to convert maximum leads to delivered orders",
        PopupBlockedTitle: "Popup Blocked",
        PopupBlockedMessage: "Your browser prevented WhatsApp from opening.",
        ClickToOpenManually: "Click here to open manually",
    },
    fr: {
        CompleteOrder: "Complétez votre commande",
        FillDetails: "Remplissez les détails ci-dessous pour finaliser.",
        ProductDetails: "Détails du produit",
        ProductName: "Smooth Sleep",
        Quantity: "Quantité",
        SelectQuantity: "Sélectionnez une quantité",
        Bottle1: "1 Bouteille",
        Bottle3: "3 Bouteilles",
        Bottle5: "5 Bouteilles",
        YourDetails: "Vos coordonnées",
        FullName: "Nom complet",
        FullNamePlaceholder: "Entrez votre nom complet*",
        PhoneNumber: "Numéro de téléphone",
        PhoneNumberPlaceholder: "+212 600-000000",
        ConfirmPhoneNumber: "Confirmez le numéro de téléphone",
        ConfirmPhoneNumberPlaceholder: "Retapez le numéro de téléphone",
        FullAddress: "Adresse complète",
        FullAddressPlaceholder: "Rue, Ville, etc.",
        ValidPhone: "Veuillez entrer un numéro de téléphone valide.",
        PhoneMismatch: "Les numéros de téléphone ne correspondent pas.",
        SubmitOrder: "Valider la commande",
        OrderConfirmed: "Commande confirmée !",
        Redirecting: "Redirection vers WhatsApp...",
        ConfirmDetails: "Veuillez confirmer vos informations",
        OrderID: "ID de commande",
        ConfirmName: "Nom",
        ConfirmPhone: "Téléphone",
        ConfirmAddress: "Adresse",
        ConfirmCallTime: "Heure de consultation",
        ConfirmDeliveryNote: "Note de livraison",
        ConfirmQuantity: "Quantité",
        ConfirmPrice: "Prix",
        ConfirmCorrect: "Ces informations sont-elles correctes ?",
        EditButton: "Non, Modifier",
        ConfirmButton: "Oui, Continuer !",
        Processing: 'Traitement...',
        Next: 'Suivant',
        Back: 'Retour',
        AdditionalInfo: "Informations supplémentaires",
        CallTime: "Heure d'appel préférée pour la consultation gratuite",
        DeliveryNote: "Note de livraison (Facultatif)",
        DeliveryNotePlaceholder: "ex: laisser chez le concierge, appeler à l'arrivée...",
        ClientNote: "(Note client) : veuillez m'appeler au {time} pour consultation et confirmation",
        SellerNote: "(Note du vendeur) : je remplace l'appel de confirmation par un appel de consultation pour convertir un maximum de prospects en commandes livrées",
        PopupBlockedTitle: "Popup Bloquée",
        PopupBlockedMessage: "Votre navigateur a empêché l'ouverture de WhatsApp.",
        ClickToOpenManually: "Cliquez ici pour ouvrir manuellement",
    },
    ar: {
        CompleteOrder: "أكمل طلبك",
        FillDetails: "املأ التفاصيل أدناه لإتمام عملية الشراء.",
        ProductDetails: "تفاصيل المنتج",
        ProductName: "سموث سليب",
        Quantity: "الكمية",
        SelectQuantity: "اختر الكمية",
        Bottle1: "زجاجة واحدة",
        Bottle3: "3 زجاجات",
        Bottle5: "5 زجاجات",
        YourDetails: "تفاصيلك الشخصية",
        FullName: "الاسم الكامل",
        FullNamePlaceholder: "أدخل اسمك الكامل*",
        PhoneNumber: "رقم الهاتف",
        PhoneNumberPlaceholder: "+212 600-000000",
        ConfirmPhoneNumber: "تأكيد رقم الهاتف",
        ConfirmPhoneNumberPlaceholder: "أعد إدخال رقم الهاتف",
        FullAddress: "العنوان الكامل",
        FullAddressPlaceholder: "الشارع، المدينة، إلخ.",
        ValidPhone: "الرجاء إدخال رقم هاتف صحيح.",
        PhoneMismatch: "رقما الهاتف غير متطابقين.",
        SubmitOrder: "تأكيد الطلب",
        OrderConfirmed: "تم تأكيد الطلب!",
        Redirecting: "جاري التحويل إلى واتساب...",
        ConfirmDetails: "الرجاء تأكيد التفاصيل الخاصة بك",
        OrderID: "رقم الطلب",
        ConfirmName: "الاسم",
        ConfirmPhone: "الهاتف",
        ConfirmAddress: "العنوان",
        ConfirmCallTime: "وقت الاستشارة",
        ConfirmDeliveryNote: "ملاحظات التسليم",
        ConfirmQuantity: "الكمية",
        ConfirmPrice: "السعر",
        ConfirmCorrect: "هل هذه المعلومات صحيحة؟",
        EditButton: "لا، تعديل",
        ConfirmButton: "نعم، إتمام الطلب!",
        Processing: 'جاري المعالجة...',
        Next: 'التالي',
        Back: 'رجوع',
        AdditionalInfo: "معلومات إضافية",
        CallTime: "الوقت المفضل للاتصال للاستشارة المجانية",
        DeliveryNote: "ملاحظات التسليم (اختياري)",
        DeliveryNotePlaceholder: "مثال: اتركها مع البواب، اتصل عند الوصول...",
        ClientNote: "(ملاحظة العميل): يرجى الاتصال بي على {time} للاستشارة والتأكيد",
        SellerNote: "(ملاحظة البائع): أقوم باستبدال مكالمة التأكيد بمكالمة الاستشارة لتحويل الحد الأقصى من العملاء المحتملين إلى طلبات تم تسليمها",
        PopupBlockedTitle: "تم حظر النافذة",
        PopupBlockedMessage: "متصفحك منع فتح نافذة واتساب.",
        ClickToOpenManually: "اضغط هنا للفتح يدوياً",
    }
};

// ==================================================================================
// 2. STATE VARIABLES
// ==================================================================================

let currentLang = 'en'; // Default language, will be updated on load.
const scrollPoints = { 25: false, 50: false, 75: false, 90: false };


// ==================================================================================
// 3. TRACKING & ANALYTICS
// ==================================================================================

/**
 * Tracks scroll depth and sends an event to the dataLayer.
 * Fires only once for each predefined percentage point.
 */
function trackScrollDepth() {
    if (typeof dataLayer === 'undefined') return;

    const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;

    for (const point in scrollPoints) {
        if (scrollPercentage >= point && !scrollPoints[point]) {
            dataLayer.push({ event: 'scroll_depth', 'scroll_percentage': parseInt(point) });
            scrollPoints[point] = true; // Mark as sent
        }
    }
}

/**
 * Pushes CTA click data to the dataLayer.
 * @param {HTMLElement} btn - The button element that was clicked.
 */
function trackCtaClick(btn) {
    if (typeof dataLayer !== 'undefined') {
        const location = btn.getAttribute('data-cta-location') || 'pricing_table';
        dataLayer.push({
            event: 'cta_click',
            cta_location: location,
            cta_label: btn.innerText.trim() || 'Buy Now'
        });
    }
}

/**
 * Pushes successful order data to the dataLayer for e-commerce tracking.
 * @param {object} orderData - The details of the order.
 */
function pushOrderData(orderData) {
    if (typeof dataLayer !== 'undefined') {
        dataLayer.push({ ecommerce: null }); // Clear previous e-commerce data
        dataLayer.push({
            event: 'Lead',
            ecommerce: {
                transaction_id: orderData.orderId,
                value: orderData.productPrice,
                currency: 'MAD',
                items: [{
                    item_id: orderData.sku,
                    item_name: orderData.productTitle,
                    quantity: orderData.productVariant,
                    price: orderData.productPrice
                }]
            }
        });
    }
}

/**
 * Sends conversion signals to analytics tools like Clarity and updates URL hash.
 */
function sendAdvancedConversionSignals() {
    // Signal for Microsoft Clarity
    if (typeof clarity === 'function') {
        clarity('set', 'Lead_completed', 'true');
    }

    // Add a hash to the URL for goal tracking in Google Analytics
    const url = new URL(window.location);
    url.hash = 'Lead_completed';
    history.replaceState(null, '', url.toString());
}


// ==================================================================================
// 4. UI LOGIC & DOM MANIPULATION
// ==================================================================================

// --- Language & Translation ---

/**
 * Updates all elements with a 'data-lang-key' attribute to the current language.
 * @param {string} lang - The language code (e.g., 'en', 'fr', 'ar').
 */
function updateFormLanguage(lang) {
    document.querySelectorAll('[data-lang-key]').forEach(el => {
        const key = el.getAttribute('data-lang-key');
        if (TRANSLATIONS[lang] && TRANSLATIONS[lang][key]) {
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = TRANSLATIONS[lang][key];
            } else {
                el.innerText = TRANSLATIONS[lang][key];
            }
        }
    });
}

/**
 * Switches the entire page's language.
 * @param {string} lang - The target language code.
 */
function switchLang(lang) {
    currentLang = lang;
    localStorage.setItem('selectedLang', lang);
    document.documentElement.lang = lang;

    // Toggle RTL/LTR for relevant containers
    const isRTL = lang === 'ar';
    const checkoutModalBody = document.getElementById('checkout-modal-body');
    const formContainer = document.getElementById('form-container');
    const confirmBox = document.getElementById('confirmation-details-box');

    checkoutModalBody.classList.toggle('rtl', isRTL);
    checkoutModalBody.classList.toggle('ltr', !isRTL);
    formContainer.setAttribute('dir', isRTL ? 'rtl' : 'ltr');

    if (confirmBox) {
        confirmBox.setAttribute('dir', isRTL ? 'rtl' : 'ltr');
        confirmBox.classList.toggle('text-right', isRTL);
        confirmBox.classList.toggle('text-left', !isRTL);
    }

    // Update visible page content sections
    document.querySelectorAll('.lang-content').forEach(content => {
        content.classList.toggle('active', content.id === `lang-${lang}`);
    });

    // Update active state of language switcher buttons
    document.querySelectorAll('.lang-switcher').forEach(switcher => {
        const isActive = switcher.dataset.lang === lang;
        switcher.classList.toggle('bg-indigo-600', isActive);
        switcher.classList.toggle('text-white', isActive);
        switcher.classList.toggle('shadow-md', isActive);
        switcher.classList.toggle('text-gray-600', !isActive);
    });
    
    // Update URL without reloading the page
    const url = new URL(window.location);
    url.searchParams.set('lang', lang);
    if (url.hash === '#Lead_completed') {
        url.hash = ''; 
    }
    history.replaceState(null, '', url.toString());

    updateFormLanguage(lang);
}

// --- Checkout Modal Management ---

/**
 * Resets the price display to its initial state.
 */
function setInitialPriceDisplay() {
    const priceDisplay = document.getElementById('product-price');
    if (priceDisplay) {
        priceDisplay.innerHTML = `--.-- ${CURRENCY_SYMBOL}`;
    }
}

/**
 * Opens the checkout modal and pre-selects a package.
 * @param {string} packageId - The value of the product variant to select.
 * @param {string} lang - The language to display the modal in.
 */
function openCheckoutModal(packageId, lang) {
    const checkoutModal = document.getElementById('checkout-modal-body');
    const variantSelect = document.getElementById('product-variant');

    switchLang(lang); // Set language first

    variantSelect.value = packageId;
    variantSelect.dispatchEvent(new Event('change')); // Trigger price update

    showStep(1); // Always start at step 1

    checkoutModal.classList.remove('modal-hidden');
    document.body.classList.add('overflow-hidden');
}
window.openCheckoutModal = openCheckoutModal; // Make it globally accessible

/**
 * Closes and completely resets the checkout modal and its form.
 */
function closeCheckoutModal() {
    const checkoutModal = document.getElementById('checkout-modal-body');
    if (!checkoutModal) return;

    checkoutModal.classList.add('modal-hidden');
    document.body.classList.remove('overflow-hidden');
    document.getElementById('confirmation-modal').classList.add('modal-hidden');
    document.getElementById('success-message').classList.add('hidden');

    // Reset form and state
    document.getElementById('checkout-form')?.reset();
    setInitialPriceDisplay();
    showStep(1);

    // Reset buttons
    const submitButton = document.getElementById('submit-button');
    const confirmButton = document.getElementById('confirm-button');
    const editButton = document.getElementById('edit-button');
    const confirmButtonText = document.getElementById('confirm-button-text');

    if (submitButton?.parentElement) {
        submitButton.parentElement.classList.remove('hidden');
    }
    if (confirmButton) confirmButton.disabled = false;
    if (editButton) editButton.disabled = false;
    if (confirmButtonText && TRANSLATIONS[currentLang]) {
        confirmButtonText.innerText = TRANSLATIONS[currentLang]['ConfirmButton'];
    }

    // Crucially, clear ecommerce data from dataLayer for the next order
    if (typeof dataLayer !== 'undefined') {
        dataLayer.push({ ecommerce: null });
    }
}
window.closeCheckoutModal = closeCheckoutModal; // Make it globally accessible


// --- Confirmation Dialog ---

/**
 * Shows the order confirmation dialog.
 */
function showConfirmDialog() {
    const confirmationModal = document.getElementById('confirmation-modal');
    const confirmModalContent = document.getElementById('modal-content-confirm');
    const submitButton = document.getElementById('submit-button');

    confirmationModal.classList.remove('modal-hidden');
    submitButton.parentElement.classList.add('hidden');

    setTimeout(() => {
        confirmModalContent.style.transform = 'scale(1)';
        confirmModalContent.style.opacity = '1';
    }, 50);
}

/**
 * Hides the order confirmation dialog.
 * ENHANCEMENT: Immediately restores the submit button for better UX.
 */
function hideConfirmDialog() {
    if (!confirmationModal) return;
    if (confirmModalContent) {
        confirmModalContent.style.transform = 'scale(0.95)';
        confirmModalContent.style.opacity = '0';
    }
// *** THE FIX ***
    // Immediately restore the submit button's parent container so the user can edit.
    if (submitButton && submitButton.parentElement) {
        submitButton.parentElement.classList.remove('hidden');
    }

    setTimeout(() => {
        confirmationModal.classList.add('modal-hidden');
    }, 300);
}

if (editButton) {
    editButton.addEventListener('click', hideConfirmDialog);
}

if (form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        showConfirmDialog();
    });
}

if (confirmButton) {
    confirmButton.addEventListener('click', function() {
        confirmButton.disabled = true;
        if (editButton) editButton.disabled = true;
        if (confirmButtonText) confirmButtonText.innerText = translations[currentLang]['Processing'];

    });
}

// --- Popup Blocker Monitor ---

/**
 * Opens a URL and monitors if it was blocked by a popup blocker.
 * If blocked, it displays an alert with a manual link.
 * @param {string} url - The URL to open.
 * @param {string} lang - The current language for translations.
 */
function monitorPopup(url, lang) {
    const popup = window.open(url, '_blank');
    if (!popup) {
        // Popup was blocked
        const alertBox = document.getElementById('popup-blocker-alert');
        const manualLink = document.getElementById('manual-whatsapp-link');

        if (alertBox && manualLink) {
            alertBox.querySelector('[data-lang-key="PopupBlockedTitle"]').innerText = TRANSLATIONS[lang].PopupBlockedTitle;
            alertBox.querySelector('[data-lang-key="PopupBlockedMessage"]').innerText = TRANSLATIONS[lang].PopupBlockedMessage;
            alertBox.querySelector('[data-lang-key="ClickToOpenManually"]').innerText = TRANSLATIONS[lang].ClickToOpenManually;
            manualLink.href = url;

            manualLink.onclick = () => alertBox.classList.add('hidden');
            alertBox.classList.remove('hidden');
        }
    }
}

// --- General UI Components ---

/**
 * Sets up the auto-hiding header functionality.
 */
function initializeAutoHidingHeader() {
    let lastScrollTop = 0;
    const header = document.querySelector('header');
    if (!header) return;

    window.addEventListener("scroll", function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop > lastScrollTop && scrollTop > header.offsetHeight) {
            header.style.top = `-${header.offsetHeight + 10}px`; // Hide
        } else {
            header.style.top = "0"; // Show
        }
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    }, false);
}

/**
 * Sets up the FAQ accordion functionality.
 */
function initializeFaqAccordion() {
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', () => {
            const alreadyActive = question.classList.contains('active');
            // Deactivate all questions
            document.querySelectorAll('.faq-question').forEach(q => q.classList.remove('active'));
            // Activate the clicked one if it wasn't already active
            if (!alreadyActive) {
                question.classList.add('active');
            }
        });
    });
}

// ==================================================================================
// 5. CORE APPLICATION LOGIC
// ==================================================================================

// --- Multi-Step Navigation ---

/**
 * Displays the specified step in the multi-step form.
 * @param {number} step - The step number to show (1, 2, or 3).
 */
function showStep(step) {
    document.getElementById('form-step-1').classList.toggle('hidden', step !== 1);
    document.getElementById('form-step-2').classList.toggle('hidden', step !== 2);
    document.getElementById('form-step-3').classList.toggle('hidden', step !== 3);
}

/**
 * Initializes event listeners for multi-step form navigation buttons.
 */
function initializeMultiStepFormNavigation() {
    // Step 1 -> Step 2
    document.getElementById('next-button').addEventListener('click', () => {
        const variantSelect = document.getElementById('product-variant');
        if (variantSelect.checkValidity()) {
            showStep(2);
        } else {
            variantSelect.reportValidity();
        }
    });

    // Step 2 -> Step 3
    document.getElementById('next-button-step2').addEventListener('click', () => {
        if (validateStep2()) {
            showStep(3);
        }
    });

    // Step 2 -> Step 1
    document.getElementById('back-button-step2').addEventListener('click', () => showStep(1));

    // Step 3 -> Step 2
    document.getElementById('back-button-step3').addEventListener('click', () => showStep(2));
}

// --- Form Validation & Submission ---

/**
 * Generates a unique order ID.
 * @returns {string} The generated order ID.
 */
function generateOrderId() {
    const timestamp = Date.now().toString();
    const uniquePart = timestamp.substring(timestamp.length - 6);
    return `LXLY-3126-${uniquePart}`;
}

/**
 * Validates all fields in step 2 of the form.
 * @returns {boolean} True if valid, false otherwise.
 */
function validateStep2() {
    const form = document.getElementById('checkout-form');
    const fullNameInput = document.getElementById('full-name');
    const phoneInput = document.getElementById('phone-number');
    const confirmPhoneInput = document.getElementById('confirm-phone-number');
    const addressInput = document.getElementById('full-address');
    const phoneFormatError = document.getElementById('phone-format-error');
    const phoneMismatchError = document.getElementById('phone-mismatch-error');

    // Hide previous errors
    phoneFormatError.classList.add('hidden');
    phoneMismatchError.classList.add('hidden');

    const fields = [fullNameInput, phoneInput, confirmPhoneInput, addressInput];
    for (const field of fields) {
        if (!field.checkValidity()) {
            form.reportValidity();
            // **التحسين**: تمرير الشاشة إلى الحقل الذي به خطأ
            field.scrollIntoView({ behavior: 'smooth', block: 'center' });
            return false;
        }
    }
    return true;
}

/**
 * Handles the main form submission process.
 * @param {Event} e - The form submission event.
 */
function handleFormSubmit(e) {
    e.preventDefault();

    const variantSelect = document.getElementById('product-variant');
    const selectedOption = variantSelect.options[variantSelect.selectedIndex];

    // Populate confirmation dialog
    document.getElementById('confirm-order-id').innerText = generateOrderId();
    document.getElementById('confirm-name').innerText = document.getElementById('full-name').value;
    document.getElementById('confirm-phone').innerText = document.getElementById('phone-number').value;
    document.getElementById('confirm-address').innerText = document.getElementById('full-address').value;
    document.getElementById('confirm-call-time').innerText = document.getElementById('note').value;
    document.getElementById('confirm-delivery-note').innerText = document.getElementById('delivery-note').value || 'N/A';
    document.getElementById('confirm-variant').innerText = TRANSLATIONS[currentLang][selectedOption.getAttribute('data-lang-key')];
    document.getElementById('confirm-price').innerText = `${parseFloat(selectedOption.getAttribute('data-price')).toFixed(0)} ${CURRENCY_SYMBOL}`;

    showConfirmDialog();
}


/**
 * Handles the final order confirmation and submission to the backend.
 */
function handleFinalConfirmation() {
    const confirmButton = document.getElementById('confirm-button');
    const editButton = document.getElementById('edit-button');
    const confirmButtonText = document.getElementById('confirm-button-text');
    
    confirmButton.disabled = true;
    editButton.disabled = true;
    confirmButtonText.innerText = TRANSLATIONS[currentLang]['Processing'];

    // Capture UTM parameters
    const utmData = {};
    const currentUrlParams = new URLSearchParams(window.location.search);
    for (const [key, value] of currentUrlParams.entries()) {
        if (key.startsWith('utm_')) {
            utmData[key] = value;
        }
    }
    
    const variantSelect = document.getElementById('product-variant');
    const selectedOption = variantSelect.options[variantSelect.selectedIndex];
    const finalPrice = parseFloat(selectedOption.getAttribute('data-price')).toFixed(0);
    
    // Format phone number for Google Sheets
    let rawClientPhone = document.getElementById('phone-number').value.trim();
    if (rawClientPhone.length === 9 && (rawClientPhone.startsWith('6') || rawClientPhone.startsWith('7'))) {
        rawClientPhone = '0' + rawClientPhone;
    }
    const phoneForGoogleSheet = "'" + rawClientPhone;
    
    // Build combined note
    const consultationTime = document.getElementById('note').value;
    const clientNoteText = TRANSLATIONS[currentLang].ClientNote.replace('{time}', consultationTime);
    const sellerNoteText = TRANSLATIONS[currentLang].SellerNote;
    const combinedNote = `${clientNoteText}\n${sellerNoteText}`;

    // Prepare data for submission
    const data = {
        orderId: document.getElementById('confirm-order-id').innerText,
        productTitle: document.getElementById('product-title').innerText,
        sku: document.getElementById('sku').value,
        productPrice: `${finalPrice} ${CURRENCY_SYMBOL}`,
        productVariant: variantSelect.value,
        clientName: document.getElementById('full-name').value,
        clientPhone: phoneForGoogleSheet,
        clientAddress: document.getElementById('full-address').value,
        note: combinedNote,
        delivery_note: document.getElementById('delivery-note').value,
        ...utmData
    };

    // Prepare WhatsApp message
    const message = `*New Order* 🔥\n-------------------\n*Order ID:* ${data.orderId}\n\n*Product:* ${data.productTitle}\n*SKU:* ${data.sku}\n*Quantity:* ${data.productVariant} bottle(s)\n*Price:* ${data.productPrice}\n\n*Client Details:*\n*Name:* ${data.clientName}\n*Phone:* ${rawClientPhone}\n*Address:* ${data.clientAddress}\n\n*Consultation & Notes:*\n${data.note}\n\n*Delivery Note:* ${data.delivery_note || 'None'}`;
    const encodedMessage = encodeURIComponent(message.trim());
    const whatsappURL = `https://wa.me/${SELLER_WHATSAPP_NUMBER}?text=${encodedMessage}`;

    // Submit to Google Sheets
    fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    .then(() => {
        
       // **THE FIX FOR SUCCESS**:
            // 1. Manually hide the confirmation modal WITHOUT showing the step 3 buttons.
            if (confirmationModal) {
                confirmationModal.classList.add('modal-hidden');
            }
            // 2. Show the success message.
            if (successMessage) {
                successMessage.classList.remove('hidden');
            }

        pushOrderData({
            orderId: data.orderId,
            productPrice: finalPrice,
            productVariant: data.productVariant,
            productTitle: data.productTitle,
            sku: data.sku
        });

        sendAdvancedConversionSignals();

        // Redirect to WhatsApp and reset the modal
        setTimeout(() => {
            monitorPopup(whatsappURL, currentLang);
            setTimeout(closeCheckoutModal, 1500);
        }, 2500);
    })
    .catch(error => {
        console.error('Error submitting to Google Sheet:', error);
        alert('An error occurred. Please try again.');
        hideConfirmDialog();
    });
}


// ==================================================================================
// 6. INITIALIZATION (ON DOM CONTENT LOADED)
// ==================================================================================

document.addEventListener('DOMContentLoaded', () => {

    // --- Determine and Set Initial Language ---
    const urlParams = new URLSearchParams(window.location.search);
    const validLangs = ['fr', 'en', 'ar'];
    const defaultLang = 'fr';
    let initialLang = defaultLang;

    const langFromUrl = urlParams.get('lang');
    if (langFromUrl && validLangs.includes(langFromUrl)) {
        initialLang = langFromUrl; // Priority 1: URL parameter
    } else {
        const savedLang = localStorage.getItem('selectedLang');
        if (savedLang && validLangs.includes(savedLang)) {
            initialLang = savedLang; // Priority 2: Local storage
        }
    }
    switchLang(initialLang);

    // --- Initialize UI Components ---
    initializeAutoHidingHeader();
    initializeFaqAccordion();
    setInitialPriceDisplay();
    
    // --- Initialize Core Logic & Event Listeners ---
    initializeMultiStepFormNavigation();
    
    document.getElementById('checkout-form').addEventListener('submit', handleFormSubmit);
    document.getElementById('confirm-button').addEventListener('click', handleFinalConfirmation);
    document.getElementById('edit-button').addEventListener('click', hideConfirmDialog);
    
    // --- Tracking Event Listeners ---
    window.addEventListener('scroll', trackScrollDepth, { passive: true });

    const ctaButtons = document.querySelectorAll('a[href^="#order-btn"], a[href^="#order-btn-fr"], a[href^="#order-btn-ar"], button[onclick^="openCheckoutModal"]');
    ctaButtons.forEach(btn => {
        btn.addEventListener('click', () => trackCtaClick(btn));
    });

    // --- Form-specific Listeners ---
    const variantSelect = document.getElementById('product-variant');
    variantSelect.addEventListener('change', function(event) {
        const selectedOption = event.target.options[event.target.selectedIndex];
        const newPrice = selectedOption.getAttribute('data-price');
        const oldPrice = selectedOption.getAttribute('data-old-price');
        const priceDisplay = document.getElementById('product-price');

        if (newPrice && newPrice !== "0") {
            let priceHTML = `<span>${parseFloat(newPrice).toFixed(0)} ${CURRENCY_SYMBOL}</span>`;
            if (oldPrice && parseFloat(oldPrice) > parseFloat(newPrice)) {
                priceHTML += ` <s class="text-red-500 font-normal text-lg ml-2">${parseFloat(oldPrice).toFixed(0)} ${CURRENCY_SYMBOL}</s>`;
            }
            priceDisplay.innerHTML = priceHTML;
        } else {
            setInitialPriceDisplay();
        }
    });
});
