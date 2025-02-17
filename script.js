document.addEventListener("DOMContentLoaded", function () {
    fetch("data.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(data => {
            const destinationSelect = document.getElementById("destination");
            const hotelSelect = document.getElementById("hotel");
            const travelSelect = document.getElementById("travel");
            const destinationList = document.getElementById("destination-list");
            const slideshow = document.getElementById("slideshow");
            const bookingSection = document.getElementById("booking");

            if (!data.destinations || !data.hotels) {
                console.error("Error: Missing data in JSON");
                return;
            }

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
                slide.onclick = () => {
                    selectDestination(destination.name);
                    bookingSection.scrollIntoView({ behavior: 'smooth' });
                };
                slideshow.appendChild(slide);
            });

            data.hotels.forEach(hotel => {
                let option = document.createElement("option");
                option.value = hotel.name;
                option.textContent = hotel.name;
                hotelSelect.appendChild(option);
            });

            ["Train", "Bus", "Flight", "Teleport"].forEach(mode => {
                let option = document.createElement("option");
                option.value = mode.toLowerCase();
                option.textContent = mode;
                travelSelect.appendChild(option);
            });

            startSlideshow();
        })
        .catch(error => console.error("Fetch error:", error));
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
            const travel = document.getElementById("travel").value;
            const nights = parseInt(document.getElementById("nights").value);
            
            const destinationData = data.destinations.find(d => d.name === destination);
            const hotelData = data.hotels.find(h => h.name === hotel);

            if (!destinationData || !hotelData) {
                console.error("Error: Missing destination or hotel data");
                return;
            }
            
            const travelCost = travel === "teleport" ? 500 : 50;
            
            const totalPrice = (destinationData.price + hotelData.price + travelCost) * nights;
            
            document.getElementById("priceOutput").textContent = `Total Price: $${totalPrice}`;
        })
        .catch(error => console.error("Fetch error in calculatePrice:", error));
}
