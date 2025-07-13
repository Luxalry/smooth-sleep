// SCROLL TRACKING
window.addEventListener('scroll', () => {
    const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    if (scrollPercentage >= 25) dataLayer.push({ event: 'scroll_depth', 'scroll_percentage': 25 });
    if (scrollPercentage >= 50) dataLayer.push({ event: 'scroll_depth', 'scroll_percentage': 50 });
    if (scrollPercentage >= 75) dataLayer.push({ event: 'scroll_depth', 'scroll_percentage': 75 });
    if (scrollPercentage >= 90) dataLayer.push({ event: 'scroll_depth', 'scroll_percentage': 90 });
  }, { passive: true });

  // CTA BUTTON CLICK TRACKING
  document.addEventListener('DOMContentLoaded', function() {
    const ctaButtons = document.querySelectorAll('a[href="#order-btn"], a[href="#order-btn-fr"], a[href="#order-btn-ar"], button[onclick^="openCheckoutModal"]');
    ctaButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        dataLayer.push({ event: 'cta_click', 'cta_label': btn.innerText || 'Buy Now' });
      });
    });
  });

  // ORDER PLACED TRACKING (Called after successful order submission)
  function pushOrderData(orderData) {
    dataLayer.push({
      event: 'purchase',
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

    // --- LANGUAGE & TRANSLATION ---
    const translations = {
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
            
        }
    };

    let currentLang = localStorage.getItem('selectedLang') || 'en';


    const pageContent = document.getElementById('page-content');
    const langContents = document.querySelectorAll('.lang-content');
    const langSwitchers = document.querySelectorAll('.lang-switcher');
    const htmlTag = document.documentElement;

    function updateFormLanguage(lang) {
        const formContainer = document.getElementById('form-container');
        if (!formContainer) return;
        currentLang = lang;
        
        document.querySelectorAll('[data-lang-key]').forEach(el => {
            const key = el.getAttribute('data-lang-key');
            if (translations[lang] && translations[lang][key]) {
                if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                    el.placeholder = translations[lang][key];
                } else {
                    el.innerText = translations[lang][key];
                }
            }
        });
    }
    
    function switchLang(lang) {
        currentLang = lang;
        localStorage.setItem('selectedLang', lang);
        htmlTag.lang = lang;

        const checkoutModalBody = document.getElementById('checkout-modal-body');
        const formContainer = document.getElementById('form-container');

        if (lang === 'ar') {
            checkoutModalBody.classList.add('rtl');
            checkoutModalBody.classList.remove('ltr');
            formContainer.setAttribute('dir', 'rtl');
        } else {
            checkoutModalBody.classList.add('ltr');
            checkoutModalBody.classList.remove('rtl');
            formContainer.setAttribute('dir', 'ltr');
        }

        const confirmBox = document.getElementById('confirmation-details-box');
        if (confirmBox) {
          if (lang === 'ar') {
            confirmBox.setAttribute('dir', 'rtl');
            confirmBox.classList.remove('text-left');
            confirmBox.classList.add('text-right');
          } else {
            confirmBox.setAttribute('dir', 'ltr');
            confirmBox.classList.remove('text-right');
            confirmBox.classList.add('text-left');
          }
        }
        
        langContents.forEach(content => {
            content.classList.remove('active');
            if (content.id === `lang-${lang}`) {
                content.classList.add('active');
            }
        });
        
        langSwitchers.forEach(switcher => {
            switcher.classList.remove('bg-indigo-600', 'text-white', 'shadow-md');
            switcher.classList.add('text-gray-600');
            if (switcher.dataset.lang === lang) {
                switcher.classList.add('bg-indigo-600', 'text-white', 'shadow-md');
                switcher.classList.remove('text-gray-600');
            }
        });
        
        updateFormLanguage(lang);
    }
    
    // --- FAQ Accordion Logic ---
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', () => {
            const alreadyActive = question.classList.contains('active');
            document.querySelectorAll('.faq-question').forEach(q => q.classList.remove('active'));
            if (!alreadyActive) {
                question.classList.add('active');
            }
        });
    });

    // --- CHECKOUT MODAL & MULTI-STEP FORM LOGIC ---
    const checkoutModal = document.getElementById('checkout-modal-body');
    const variantSelect = document.getElementById('product-variant');
    const priceDisplay = document.getElementById('product-price');
    const currencySymbol = 'MAD';
    
    const formStep1 = document.getElementById('form-step-1');
    const formStep2 = document.getElementById('form-step-2');
    const formStep3 = document.getElementById('form-step-3');

    const nextButton = document.getElementById('next-button');
    const nextButtonStep2 = document.getElementById('next-button-step2');
    const backButtonStep2 = document.getElementById('back-button-step2');
    const backButtonStep3 = document.getElementById('back-button-step3');

    function showStep(step) {
        formStep1.classList.toggle('hidden', step !== 1);
        formStep2.classList.toggle('hidden', step !== 2);
        formStep3.classList.toggle('hidden', step !== 3);
    }

    nextButton.addEventListener('click', () => {
        // Validate step 1
        if (variantSelect.checkValidity()) {
            showStep(2);
        } else {
            variantSelect.reportValidity();
        }
    });
    
    nextButtonStep2.addEventListener('click', () => {
        // Validate all fields in step 2
        if (!fullNameInput.checkValidity() || !phoneInput.checkValidity() || !confirmPhoneInput.checkValidity() || !addressInput.checkValidity()) {
            form.reportValidity();
            return;
        }
        if (phoneInput.value.trim().length < 9) {
            phoneFormatError.classList.remove('hidden');
            phoneInput.focus();
            return;
        }
        if (phoneInput.value !== confirmPhoneInput.value) {
            phoneMismatchError.classList.remove('hidden');
            confirmPhoneInput.focus();
            return;
        }
        // If valid, hide errors and go to step 3
        phoneFormatError.classList.add('hidden');
        phoneMismatchError.classList.add('hidden');
        showStep(3);
    });
    
    backButtonStep2.addEventListener('click', () => {
        showStep(1);
    });

    backButtonStep3.addEventListener('click', () => {
        showStep(2);
    });


    function openCheckoutModal(packageId, lang) {
        // Set language first
        switchLang(lang); // Use switchLang to handle all language updates

        // Select package
        variantSelect.value = packageId;
        // Trigger change event to update price display
        variantSelect.dispatchEvent(new Event('change'));

        // Always start at step 1
        showStep(1);

        // Show modal
        checkoutModal.classList.remove('modal-hidden');
        document.body.classList.add('overflow-hidden'); // Prevent background scroll
    }

    function closeCheckoutModal() {
        checkoutModal.classList.add('modal-hidden');
        document.body.classList.remove('overflow-hidden');
        // Hide confirmation/success overlays as well
        document.getElementById('confirmation-modal').classList.add('modal-hidden');
        document.getElementById('success-message').classList.add('hidden');
    }

    // --- FORM SUBMISSION & VALIDATION LOGIC ---
    const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwDyvrE3gVhvxUPiXLwk_M_p_z-vO1acq2nljXK10HonrJCkne00zNIKhx7lecE5cc2ug/exec';
    const sellerWhatsappNumber = '212768356015';

    const form = document.getElementById('checkout-form');
    const fullNameInput = document.getElementById('full-name');
    const phoneInput = document.getElementById('phone-number');
    const confirmPhoneInput = document.getElementById('confirm-phone-number');
    const addressInput = document.getElementById('full-address');

    const phoneFormatError = document.getElementById('phone-format-error');
    const phoneMismatchError = document.getElementById('phone-mismatch-error');
    const confirmationModal = document.getElementById('confirmation-modal');
    const confirmModalContent = document.getElementById('modal-content-confirm');
    const confirmButton = document.getElementById('confirm-button');
    const confirmButtonText = document.getElementById('confirm-button-text');
    const editButton = document.getElementById('edit-button');
    const successMessage = document.getElementById('success-message');
    const submitButton = document.getElementById('submit-button');

    editButton.addEventListener('click', function() {
        hideConfirmDialog();
        document.getElementById('submit-button').classList.remove('hidden'); // Show submit button again
});



    function setInitialPriceDisplay() {
        priceDisplay.innerHTML = `--.-- ${currencySymbol}`;
    }

    function generateOrderId() {
        const timestamp = Date.now().toString();
        const uniquePart = timestamp.substring(timestamp.length - 6);
        return `LXLY-3126-${uniquePart}`;
    }
    
    function showConfirmDialog() {
        confirmationModal.classList.remove('modal-hidden');
        submitButton.parentElement.classList.add('hidden');
        setTimeout(() => {
            confirmModalContent.style.transform = 'scale(1)';
            confirmModalContent.style.opacity = '1';
        }, 50); 
    }

    function hideConfirmDialog() {
        confirmModalContent.style.transform = 'scale(0.95)';
        confirmModalContent.style.opacity = '0';
        submitButton.parentElement.classList.remove('hidden');
        setTimeout(() => {
            confirmationModal.classList.add('modal-hidden');
        }, 300);
    }

    variantSelect.addEventListener('change', function(event) {
        const selectedOption = event.target.options[event.target.selectedIndex];
        const newPrice = selectedOption.getAttribute('data-price');
        const oldPrice = selectedOption.getAttribute('data-old-price');

        if (newPrice && newPrice !== "0") {
            let priceHTML = `<span>${parseFloat(newPrice).toFixed(0)} ${currencySymbol}</span>`;
            if (oldPrice && parseFloat(oldPrice) > parseFloat(newPrice)) {
                priceHTML += ` <s class="text-red-500 font-normal text-lg ml-2">${parseFloat(oldPrice).toFixed(0)} ${currencySymbol}</s>`;
            }
            priceDisplay.innerHTML = priceHTML;
        } else {
            setInitialPriceDisplay();
        }
    });

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const selectedOption = variantSelect.options[variantSelect.selectedIndex];
        document.getElementById('confirm-order-id').innerText = generateOrderId();
        document.getElementById('confirm-name').innerText = fullNameInput.value;
        document.getElementById('confirm-phone').innerText = phoneInput.value;
        document.getElementById('confirm-address').innerText = addressInput.value;
        document.getElementById('confirm-call-time').innerText = document.getElementById('note').value;
        document.getElementById('confirm-delivery-note').innerText = document.getElementById('delivery-note').value || 'N/A';
        document.getElementById('confirm-variant').innerText = translations[currentLang][selectedOption.getAttribute('data-lang-key')];
        document.getElementById('confirm-price').innerText = `${parseFloat(selectedOption.getAttribute('data-price')).toFixed(0)} ${currencySymbol}`;
        showConfirmDialog();
        document.getElementById('submit-button').classList.add('hidden');
    });

    confirmButton.addEventListener('click', function () {
        confirmButton.disabled = true;
        editButton.disabled = true;
        confirmButtonText.innerText = translations[currentLang]['Processing'];

        const selectedOption = variantSelect.options[variantSelect.selectedIndex];
        const finalPrice = parseFloat(selectedOption.getAttribute('data-price')).toFixed(0);

        let rawClientPhone = phoneInput.value.trim();
        if (rawClientPhone.length === 9 && (rawClientPhone.startsWith('6') || rawClientPhone.startsWith('7'))) {
            rawClientPhone = '0' + rawClientPhone;
        }
        const phoneForGoogleSheet = "'" + rawClientPhone;

        const orderId = document.getElementById('confirm-order-id').innerText;
        const productTitle = document.getElementById('product-title').innerText;
        const sku = document.getElementById('sku').value;

        // Combine the notes into a single field
        

// 1. Build the notes dynamically using translations
const consultationTime = document.getElementById('note').value;
const clientNoteText = translations[currentLang].ClientNote.replace('{time}', consultationTime);
const sellerNoteText = translations[currentLang].SellerNote;
const combinedNote = `${clientNoteText}\n${sellerNoteText}`;

// // 2. Create the data object with the combined notes
const data = {
orderId: orderId,
productTitle: productTitle,
sku: sku,
productPrice: `${finalPrice} ${currencySymbol}`,
productVariant: variantSelect.value,
clientName: fullNameInput.value,
clientPhone: phoneForGoogleSheet,
clientAddress: addressInput.value,
note: combinedNote,
delivery_note: document.getElementById('delivery-note').value,
};

        // Prepare WhatsApp message
        const message = `*New Order* 🔥\n-------------------\n*Order ID:* ${orderId}\n\n*Product:* ${productTitle}\n*SKU:* ${data.sku}\n*Quantity:* ${data.productVariant} bottle(s)\n*Price:* ${data.productPrice}\n\n*Client Details:*\n*Name:* ${data.clientName}\n*Phone:* ${rawClientPhone}\n*Address:* ${data.clientAddress}\n\n*Consultation & Notes:*\n${data.note}\n\n*Delivery Note:* ${data.delivery_note || 'None'}`;
        const encodedMessage = encodeURIComponent(message.trim());
        const whatsappURL = `https://wa.me/${sellerWhatsappNumber}?text=${encodedMessage}`;

        // Submit to Google Sheets
        fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        .then(() => {
            hideConfirmDialog();
            successMessage.classList.remove('hidden');

            pushOrderData({
                orderId: data.orderId,
                productPrice: finalPrice,
                productVariant: data.productVariant,
                productTitle: data.productTitle,
                sku: data.sku
            });

            // Wait briefly, then redirect to WhatsApp
            setTimeout(() => {
                window.open(whatsappURL, '_blank');
                setTimeout(() => {
                    form.reset();
                    setInitialPriceDisplay();
                    closeCheckoutModal();
                    confirmButton.disabled = false;
                    editButton.disabled = false;
                    confirmButtonText.innerText = translations[currentLang]['ConfirmButton'];
                }, 1000);
            }, 800); // Slight delay to show success screen
        })
        .catch(error => {
            console.error('Error submitting to Google Sheet:', error);
            alert('An error occurred while submitting your order. Please try again.');
            hideConfirmDialog();
            confirmButton.disabled = false;
            editButton.disabled = false;
            confirmButtonText.innerText = translations[currentLang]['ConfirmButton'];
        });
    });

// On page load, apply the saved language or default to 'en'
document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('selectedLang') || 'en';
    switchLang(savedLang);

    // Auto-hiding header logic
    let lastScrollTop = 0;
    const header = document.querySelector('header');
    window.addEventListener("scroll", function () {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop > lastScrollTop && scrollTop > header.offsetHeight) {
            header.style.top = `-${header.offsetHeight + 10}px`;
        } else {
            header.style.top = "0";
        }
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    }, false);
    
    setInitialPriceDisplay();
});