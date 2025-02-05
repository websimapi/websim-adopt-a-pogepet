/* script.js */
const pogePets = [
  { id: 1, shape: 'circle', color: '#FF6B6B', element: 'fire' },
  { id: 2, shape: 'square', color: '#6BCB77', element: 'earth' },
  { id: 3, shape: 'triangle', color: '#4D96FF', element: 'water' },
  { id: 4, shape: 'oval', color: '#F5CD79', element: 'air' },
  { id: 5, shape: 'hexagon', color: '#E77F67', element: 'electric' }
];

function createSVG(pet) {
  const svgNS = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(svgNS, "svg");
  svg.setAttribute("class", "pet-svg");
  svg.setAttribute("viewBox", "0 0 100 100");

  if (pet.shape === 'circle') {
    const circle = document.createElementNS(svgNS, "circle");
    circle.setAttribute("cx", "50");
    circle.setAttribute("cy", "50");
    circle.setAttribute("r", "40");
    circle.setAttribute("fill", pet.color);
    svg.appendChild(circle);
  } else if (pet.shape === 'square') {
    const rect = document.createElementNS(svgNS, "rect");
    rect.setAttribute("x", "20");
    rect.setAttribute("y", "20");
    rect.setAttribute("width", "60");
    rect.setAttribute("height", "60");
    rect.setAttribute("fill", pet.color);
    svg.appendChild(rect);
  } else if (pet.shape === 'triangle') {
    const polygon = document.createElementNS(svgNS, "polygon");
    polygon.setAttribute("points", "50,10 90,90 10,90");
    polygon.setAttribute("fill", pet.color);
    svg.appendChild(polygon);
  } else if (pet.shape === 'oval') {
    const ellipse = document.createElementNS(svgNS, "ellipse");
    ellipse.setAttribute("cx", "50");
    ellipse.setAttribute("cy", "50");
    ellipse.setAttribute("rx", "35");
    ellipse.setAttribute("ry", "20");
    ellipse.setAttribute("fill", pet.color);
    svg.appendChild(ellipse);
  } else if (pet.shape === 'hexagon') {
    const polygon = document.createElementNS(svgNS, "polygon");
    polygon.setAttribute("points", "50,15 80,30 80,60 50,85 20,60 20,30");
    polygon.setAttribute("fill", pet.color);
    svg.appendChild(polygon);
  }
  return svg;
}

function renderPets() {
  const petContainer = document.getElementById("pet-container");
  petContainer.innerHTML = ''; // Clear existing pets
  pogePets.forEach(pet => {
    const card = document.createElement('div');
    card.classList.add('pet-card');
    card.setAttribute('data-id', pet.id);
    
    // Create SVG for pet
    const svg = createSVG(pet);
    card.appendChild(svg);
    
    // Pet details
    const details = document.createElement('div');
    details.classList.add('pet-details');
    details.innerHTML = `<strong>${pet.shape}</strong><br>${pet.element}`;
    card.appendChild(details);
    
    // Adopt button
    const button = document.createElement('button');
    button.classList.add('adopt-button');
    button.textContent = 'Adopt';
    button.addEventListener('click', (e) => {
      e.stopPropagation();
      adoptPet(pet.id);
    });
    card.appendChild(button);
    
    petContainer.appendChild(card);
  });
}

function adoptPet(id) {
  const index = pogePets.findIndex(pet => pet.id === id);
  if (index !== -1) {
    const adoptedPet = pogePets.splice(index, 1)[0];
    addToAdopted(adoptedPet);
    renderPets();  // Update pet list in the bay
  }
}

function addToAdopted(pet) {
  const adoptedContainer = document.getElementById("adopted-container");
  const card = document.createElement('div');
  card.classList.add('adopted-card');
  card.setAttribute('data-id', pet.id);
  
  const svg = createSVG(pet);
  card.appendChild(svg);
  
  const details = document.createElement('div');
  details.classList.add('pet-details');
  details.innerHTML = `<strong>${pet.shape}</strong><br>${pet.element}`;
  card.appendChild(details);
  
  // Celebrate adoption with a message
  const celebrate = document.createElement('div');
  celebrate.classList.add('celebrate');
  celebrate.textContent = "Adopted!";
  card.appendChild(celebrate);
  
  adoptedContainer.appendChild(card);
}

document.addEventListener('DOMContentLoaded', () => {
  renderPets();
});