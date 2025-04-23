const organs = document.querySelectorAll('.organ');
const dropZones = document.querySelectorAll('.drop-zone');
const successSound = document.getElementById('success-sound');
const errorSound = document.getElementById('error-sound');
const korrekt = document.getElementById('korrekt');
const forkert = document.getElementById('forkert');


organs.forEach(organ => {
    organ.addEventListener('dragstart', e => {
        e.dataTransfer.setData('text/plain', organ.dataset.organ);
});
});

dropZones.forEach(zone => {
    zone.addEventListener('dragover', e => {
      e.preventDefault();
    });
  
    zone.addEventListener('drop', e => {
      e.preventDefault();
      const draggedOrgan = e.dataTransfer.getData('text/plain');
      const correctOrgan = zone.dataset.organ;
  
      if (draggedOrgan === correctOrgan) {
        successSound.play();
        korrekt.style.animation = 'none';
        void korrekt.offsetWidth; // Trigger reflow
        korrekt.style.animation = 'lys 1s';
      } else {
        errorSound.play();
        forkert.style.animation = 'none';
        void forkert.offsetWidth; // Trigger reflow
        forkert.style.animation = 'lys 1s';
      }
    });
  });
