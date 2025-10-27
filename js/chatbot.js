const chatbotToggle = document.querySelector('.chatbot__toggle');
const chatbotWindow = document.querySelector('.chatbot__window');
const chatbotClose = document.querySelector('.chatbot__close');
const chatbotForm = document.getElementById('chatbot-form');
const chatbotInput = document.getElementById('chatbot-input');
const chatbotMessages = document.getElementById('chatbot-messages');

const responses = [
  {
    keywords: ['hola', 'buenas', 'saludos'],
    answer: '¡Hola! Soy el asistente IA de Cristian y Alonso Data. ¿En qué puedo ayudarte?'
  },
  {
    keywords: ['renta', 'alquiler'],
    answer: 'Analizamos el incremento del precio de la renta en Barcelona combinando fuentes públicas y datos inmobiliarios para identificar patrones por distrito.'
  },
  {
    keywords: ['turismo'],
    answer: 'El turismo genera presión en la demanda de vivienda de corta estancia, lo que influye en el precio de la renta en zonas céntricas y costeras.'
  },
  {
    keywords: ['comercio'],
    answer: 'Medimos la actividad comercial para comprender cómo la vitalidad económica impulsa el interés por zonas específicas y afecta los precios de alquiler.'
  },
  {
    keywords: ['correlacion', 'correlación'],
    answer: 'Nuestros gráficos muestran la correlación entre renta, turismo y comercio, ayudando a detectar momentos clave donde los indicadores se alinean.'
  },
  {
    keywords: ['bigquery', 'proceso'],
    answer: 'El proceso en BigQuery incluye limpieza, normalización y modelado de datos antes de generar visualizaciones en Looker Studio.'
  },
  {
    keywords: ['contacto', 'contactar', 'email'],
    answer: 'Puedes escribirnos a través del formulario de contacto o al correo cmaldonadoa@student.eae.es.'
  },
  {
    keywords: ['looker'],
    answer: 'Looker Studio nos permite presentar dashboards interactivos para explorar tendencias y KPIs vinculados al mercado de la renta.'
  },
  {
    keywords: ['mapa'],
    answer: 'El mapa interactivo muestra rentas estimadas por distrito, facilitando la identificación de áreas con mayor presión en precios.'
  },
  {
    keywords: ['grafico', 'gráfico', 'graficos', 'gráficos'],
    answer: 'Utilizamos Chart.js para representar la evolución anual de la renta y la relación con turismo y comercio.'
  },
  {
    keywords: ['privacidad', 'datos'],
    answer: 'La política de datos detalla cómo protegemos la información y cómo ejercitar tus derechos. Está disponible en la página de Política de Datos.'
  }
];

const fallbackAnswer = 'No estoy seguro de haber entendido tu consulta, pero puedo ayudarte con información sobre renta, turismo, comercio, BigQuery, Looker Studio, gráficos o privacidad.';

const createMessage = (text, type = 'bot') => {
  const message = document.createElement('div');
  message.classList.add('chatbot__message');
  message.classList.add(type === 'user' ? 'chatbot__message--user' : 'chatbot__message--bot');
  message.textContent = text;
  chatbotMessages.appendChild(message);
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
};

const findResponse = (input) => {
  const normalized = input.toLowerCase();
  for (const response of responses) {
    if (response.keywords.some(keyword => normalized.includes(keyword))) {
      return response.answer;
    }
  }
  return fallbackAnswer;
};

const openChatbot = () => {
  if (chatbotWindow.hasAttribute('hidden')) {
    chatbotWindow.removeAttribute('hidden');
    chatbotWindow.setAttribute('aria-hidden', 'false');
    chatbotMessages.focus();
  }
};

if (chatbotToggle) {
  chatbotToggle.addEventListener('click', () => {
    const isHidden = chatbotWindow.hasAttribute('hidden');
    if (isHidden) {
      openChatbot();
    } else {
      chatbotWindow.setAttribute('hidden', '');
      chatbotWindow.setAttribute('aria-hidden', 'true');
    }
  });
}

if (chatbotClose) {
  chatbotClose.addEventListener('click', () => {
    chatbotWindow.setAttribute('hidden', '');
    chatbotWindow.setAttribute('aria-hidden', 'true');
    chatbotToggle.focus();
  });
}

if (chatbotForm) {
  chatbotForm.addEventListener('submit', event => {
    event.preventDefault();
    const message = chatbotInput.value.trim();
    if (!message) return;

    createMessage(message, 'user');
    chatbotInput.value = '';

    const response = findResponse(message);
    setTimeout(() => {
      createMessage(response, 'bot');
    }, 400);
  });
}

window.addEventListener('DOMContentLoaded', () => {
  if (chatbotMessages) {
    createMessage('¡Hola! Soy el asistente IA de Cristian y Alonso Data. ¿En qué puedo ayudarte?');
  }
});
