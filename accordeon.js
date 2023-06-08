var activeIndex;

document.addEventListener('DOMContentLoaded', function() {
  var sektionen = document.querySelectorAll('.akkordeon .sektion');

  sektionen.forEach(function(sektion, index) {
    sektion.style.setProperty('--index', index);
    sektion.addEventListener('click', toggleSektion);
  });

  var buttons = document.querySelectorAll('.akkordeon .sektion button');


  buttons.forEach(function(button) {
    button.addEventListener('click', function(event) {
      event.stopPropagation();
    });
  });

  var sectionChangeEvent = new Event('sectionChange');

  function toggleSektion(event) {
    if (event.target.tagName === 'TEXTAREA') {
      event.stopPropagation();
      return;
    }

    var aktiveSektion = document.querySelector('.akkordeon .sektion.aktiv');
    var clickedSection = this;
    var currentIndex = parseInt(clickedSection.style.getPropertyValue('--index'));
    activeIndex = aktiveSektion ? parseInt(aktiveSektion.style.getPropertyValue('--index')) : -1;
  
    if (activeIndex === -1 && currentIndex !== 0) {
      // Only section one is clickable initially
      return;
    }
  
    if (activeIndex !== -1 && currentIndex !== activeIndex + 1) {
      // Clicked section is not the next one, ignore the click event
      return;
    }
  
    if (aktiveSektion && aktiveSektion !== clickedSection) {
      aktiveSektion.classList.remove('aktiv');
    }

    console.log(activeIndex);
  
    clickedSection.classList.toggle('aktiv');
  
    // Call another function and pass the clicked section as an argument
    document.dispatchEvent(sectionChangeEvent);
  }
});