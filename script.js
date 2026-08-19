const form = document.querySelector('#bookingForm');
const total = document.querySelector('#totalPrice');
const success = document.querySelector('#formSuccess');

const prices = {
  tosa: { small: 55, medium: 70, large: 90 },
  banho: { small: 45, medium: 60, large: 80 },
  hotel: { small: 80, medium: 95, large: 115 }
};

function selected(name) {
  return form.querySelector(`[name="${name}"]:checked`).value;
}

function updatePrice() {
  const price = prices[selected('service')][selected('size')];
  total.textContent = `R$ ${price}${selected('service') === 'hotel' ? '/dia' : ''}`;
}

function maskPhone(event) {
  let value = event.target.value.replace(/\D/g, '').slice(0, 11);
  if (value.length > 6) value = value.replace(/(\d{2})(\d{5})(\d+)/, '($1) $2-$3');
  else if (value.length > 2) value = value.replace(/(\d{2})(\d+)/, '($1) $2');
  event.target.value = value;
}

if (form) {
  form.elements.date.min = new Date().toISOString().split('T')[0];
  form.querySelectorAll('input[type="radio"]').forEach(input => input.addEventListener('change', updatePrice));
  form.elements.phone.addEventListener('input', maskPhone);
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    const serviceNames = { tosa: 'Tosa', banho: 'Banho', hotel: 'Hotelzinho' };
    const sizeNames = { small: 'pequeno', medium: 'médio', large: 'grande' };
    success.textContent = `Tudo certo, ${form.elements.owner.value}! Recebemos o pedido de ${serviceNames[selected('service')]} para ${form.elements.pet.value} (porte ${sizeNames[selected('size')]}). Nossa equipe vai confirmar pelo WhatsApp. 🐾`;
    success.classList.add('show');
    success.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });
  updatePrice();
}

const contactForm = document.querySelector('#contactForm');
if (contactForm) {
  contactForm.elements.contactPhone.addEventListener('input', maskPhone);
  contactForm.addEventListener('submit', event => {
    event.preventDefault();
    if (!contactForm.checkValidity()) {
      contactForm.reportValidity();
      return;
    }
    const contactSuccess = document.querySelector('#contactSuccess');
    contactSuccess.textContent = `Mensagem recebida, ${contactForm.elements.name.value}! Nossa equipe vai responder o mais breve possível. 💜`;
    contactSuccess.classList.add('show');
    contactSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    contactForm.reset();
  });
}
