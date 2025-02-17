document.addEventListener("DOMContentLoaded", function () {
    fetch("data.json")
        .then(response => response.json())
        .then(data => {
            const destinationSelect = document.getElementById("destination");
            const hotelSelect = document.getElementById("hotel");
            const destinationList = document.getElementById("destination-list");
            const slideshow = document.getElementById("slideshow");

            data.destinations.forEach(destination => {
                let option = document.createElement("option");
                option.value = destination.name;
                option.textContent = destination.name;
                destinationSelect.appendChild(option);
                
                let destinationItem = document.createElement("div");
                destinationItem.innerHTML = `<h3>${destination.name}</h3>
                <img src="${destination.image}" alt="${destination.name}" class="thumbnail" onclick="selectDestination('${destination.name}')">
                <p>${destination.description}</p>`;
                destinationList.appendChild(destinationItem);
                
                let slide = document.createElement("img");
                slide.src = destination.image;
                slide.alt = destination.name;
                slide.classList.add("slide");
                slide.onclick = () => selectDestination(destination.name);
                slideshow.appendChild(slide);
            });

            data.hotels.forEach(hotel => {
                let option = document.createElement("option");
                option.value = hotel.name;
                option.textContent = hotel.name;
                hotelSelect.appendChild(option);
            });

            startSlideshow();
        });
});

function selectDestination(name) {
    document.getElementById("destination").value = name;
}

function startSlideshow() {
    let index = 0;
    const slides = document.querySelectorAll(".slide");
    
    function showSlide() {
        slides.forEach(slide => slide.style.display = "none");
        slides[index].style.display = "block";
        index = (index + 1) % slides.length;
    }
    
    showSlide();
    setInterval(showSlide, 3000);
}

function calculatePrice() {
    fetch("data.json")
        .then(response => response.json())
        .then(data => {
            const destination = document.getElementById("destination").value;
            const hotel = document.getElementById("hotel").value;
            const nights = parseInt(document.getElementById("nights").value);
            
            const destinationPrice = data.destinations.find(d => d.name === destination).price;
            const hotelPrice = data.hotels.find(h => h.name === hotel).price;
            
            const totalPrice = (destinationPrice + hotelPrice) * nights;
            
            document.getElementById("priceOutput").textContent = `Total Price: $${totalPrice}`;
        });
}
