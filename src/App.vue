<template>
  <div id="app">
    <header>
      <h1>Hora Actual</h1>
      <div class="clock-container">
        <!-- Icono izquierdo -->
        <img src="/icon/tiempo.png" alt="Icono de tiempo" class="icon-left" />
        <!-- Hora actual -->
        <div class="clock">
          <span>{{ time }}</span>
        </div>
        <!-- Icono derecho -->
        <img src="/icon/reloj.png" alt="Icono de reloj" class="icon-right" />
      </div>
    </header>
  </div>
</template>

<script>
import "@/assets/styles.css"; // Ruta al archivo CSS

export default {
  data() {
    return {
      time: '',
    };
  },
  methods: {
    updateClock() {
      const now = new Date();
      this.time = now.toLocaleTimeString(); // Formato de hora local
    },
  },
  mounted() {
    // Registra el Service Worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/service-worker.js')
        .then((registration) => {
          console.log('Service Worker registrado con éxito:', registration);
        })
        .catch((error) => {
          console.log('Error al registrar el Service Worker:', error);
        });
    }

    this.updateClock(); // Establece la hora al cargar
    setInterval(this.updateClock, 1000); // Actualiza la hora cada segundo
  },
};
</script>
