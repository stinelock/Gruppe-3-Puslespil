const organs = document.querySelectorAll('.organ');
const dropZones = document.querySelectorAll('.drop-zone');
const successSound = document.getElementById('success-sound');
const errorSound = document.getElementById('error-sound');
const korrekt = document.getElementById('korrekt');
const forkert = document.getElementById('forkert');
const totalOrgans = organs.length;
let placedCount = 0; // 🔢 tæller korrekt placerede organer

organs.forEach(organ => {
    organ.addEventListener('dragstart', e => {
        e.dataTransfer.setData('text/plain', organ.id);
    });
});

dropZones.forEach(zone => {
    zone.addEventListener('dragover', e => {
        e.preventDefault();
    });

    zone.addEventListener('drop', e => {
        e.preventDefault();
        const draggedOrganId = e.dataTransfer.getData('text/plain');
        const organElement = document.getElementById(draggedOrganId);
        const correctOrgan = zone.dataset.organ;

        if (organElement.dataset.organ === correctOrgan) {
            successSound.play();
            zone.appendChild(organElement); // 💡 flyt organet ind i dropzonen
            organElement.setAttribute('draggable', 'false');
            organElement.classList.add('placed');
            korrekt.style.animation = 'none';
            void korrekt.offsetWidth; // Trigger reflow
            korrekt.style.animation = 'lys 1s';

            placedCount++; // ✅ tæl korrekt placering
            if (placedCount === totalOrgans) {
                // 🎉 vis slut-popup når alle er på plads
                setTimeout(() => {
                    document.getElementById('slutPopup').style.display = "block";
                    document.getElementById('overlay').style.display = "block";
                }, 0);
            }

        } else {
            errorSound.play();
            forkert.style.animation = 'none';
            void forkert.offsetWidth; // Trigger reflow
            forkert.style.animation = 'lys 1s';
        }
    });
});



setTimeout(function () {
    document.getElementById('startPopup').style.display = "block";
    document.getElementById('overlay').style.display = "block";
}, 500);

function closePopup() {
    document.getElementById('startPopup').style.display = "none";
    document.getElementById('overlay').style.display = "none";
}






function resetGame() {
    // Skjul slut-popup og overlay
    document.getElementById('slutPopup').style.display = "none";
    document.getElementById('overlay').style.display = "none";

    // Nulstil counter
    placedCount = 0;

    // Gør organerne draggable igen og flyt dem tilbage
    organs.forEach(organ => {
        organ.setAttribute('draggable', 'true');
        organ.classList.remove('placed');
        document.getElementById('organs').appendChild(organ);
    });
}