import React, { useEffect } from 'react';

const GoogleTranslate = () => {

  useEffect(() => {
    // Cargar el script de Google Translate
    const addGoogleTranslateScript = () => {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.async = true;
      script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      document.body.appendChild(script);
    };

    // Inicializar el widget de Google Translate
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement({
        pageLanguage: 'es', // Idioma de la página original
        includedLanguages: '', // Permitir todos los idiomas
        layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
        autoDisplay: true // Mostrar el popup automáticamente
      }, 'google_translate_element');
    };

    // Agregar el script de Google Translate
    addGoogleTranslateScript();
  }, []);

  return (
    <div>
      {/* Este div será donde se inyectará el widget de Google Translate */}
      <div id="google_translate_element"></div>
    </div>
  );
};

export default GoogleTranslate;