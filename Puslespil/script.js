const organs = document.querySelectorAll('.organ');
const dropZones = document.querySelectorAll('.drop-zone');
const successSound = document.getElementById('success-sound');
const errorSound = document.getElementById('error-sound');

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
      } else {
        errorSound.play();
      }
    });
  });