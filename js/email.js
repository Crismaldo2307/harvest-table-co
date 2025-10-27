const contactForm = document.getElementById('contact-form');
const statusElement = document.getElementById('form-status');
const errors = {
  name: document.getElementById('error-name'),
  email: document.getElementById('error-email'),
  message: document.getElementById('error-message')
};

const emailRegex = /[^\s@]+@[^\s@]+\.[^\s@]+/;

const clearErrors = () => {
  Object.values(errors).forEach(el => {
    if (el) el.textContent = '';
  });
};

const setStatus = (message, isError = false) => {
  if (statusElement) {
    statusElement.textContent = message;
    statusElement.style.color = isError ? '#b00020' : '#2a3c24';
  }
};

const fallbackMailto = (formData) => {
  const subject = encodeURIComponent('Consulta sobre el análisis de renta en Barcelona');
  const body = encodeURIComponent(`Nombre: ${formData.name}\nEmail: ${formData.email}\nEmpresa: ${formData.company || 'No especificada'}\nMensaje: ${formData.message}`);
  window.location.href = `mailto:cmaldonadoa@student.eae.es?subject=${subject}&body=${body}`;
};

if (typeof emailjs !== 'undefined') {
  emailjs.init('YOUR_PUBLIC_KEY');
}

const validate = (formData) => {
  clearErrors();
  let valid = true;

  if (!formData.name) {
    errors.name.textContent = 'Por favor, introduce tu nombre.';
    valid = false;
  }

  if (!formData.email || !emailRegex.test(formData.email)) {
    errors.email.textContent = 'Introduce un correo electrónico válido.';
    valid = false;
  }

  if (!formData.message) {
    errors.message.textContent = 'Escribe un mensaje para poder ayudarte.';
    valid = false;
  }

  return valid;
};

if (contactForm) {
  contactForm.addEventListener('submit', event => {
    event.preventDefault();

    const formData = {
      name: contactForm.name.value.trim(),
      email: contactForm.email.value.trim(),
      company: contactForm.company.value.trim(),
      message: contactForm.message.value.trim()
    };

    if (!validate(formData)) {
      setStatus('Por favor, corrige los errores indicados.', true);
      return;
    }

    setStatus('Enviando mensaje...');

    if (typeof emailjs === 'undefined' || !emailjs.send) {
      fallbackMailto(formData);
      setStatus('Tu cliente de correo se abrirá para completar el envío.');
      return;
    }

    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
      from_name: formData.name,
      reply_to: formData.email,
      company: formData.company,
      message: formData.message
    }).then(() => {
      setStatus('¡Mensaje enviado! Nos pondremos en contacto muy pronto.');
      contactForm.reset();
    }).catch(() => {
      setStatus('No fue posible enviar el mensaje automáticamente. Abriendo cliente de correo...', true);
      fallbackMailto(formData);
    });
  });
}
