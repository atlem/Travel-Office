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
            const slideshow = document.getElementById("slideshow");document.addEventListener("DOMContentLoaded", function () {
    fetch("data.json")
        .then(response => response.json())
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
                slide.style.display = "none";
                slide.onclick = () => {
                    selectDestination(destination.name);
                    bookingSection.scrollIntoView({ behavior: 'smooth' });
                };
                slideshow.appendChild(slide);
            });

            updateHotels(destinationSelect.value);
            destinationSelect.addEventListener("change", function () {
                updateHotels(this.value);
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

function calculatePrice() {
    const destination = document.getElementById("destination").value;
    const hotel = document.getElementById("hotel").value;
    const travel = document.getElementById("travel").value;
    const nights = parseInt(document.getElementById("nights").value);

    fetch("calculate_price", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            destination: destination,
            hotel: hotel,
            travel: travel,
            nights: nights
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            console.error("Error:", data.error);
            document.getElementById("priceOutput").textContent = "Error calculating price.";
        } else {
            document.getElementById("priceOutput").textContent = `Total Price: $${data.total_price}`;
        }
    })
    .catch(error => console.error("Fetch error in calculatePrice:", error));
}
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
                slide.style.display = "none";
                slide.onclick = () => {
                    selectDestination(destination.name);
                    bookingSection.scrollIntoView({ behavior: 'smooth' });
                };
                slideshow.appendChild(slide);
            });

            updateHotels(destinationSelect.value);
            destinationSelect.addEventListener("change", function () {
                updateHotels(this.value);
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
    updateHotels(name);
}

function updateHotels(destination) {
    fetch("data.json")
        .then(response => response.json())
        .then(data => {
            const hotelSelect = document.getElementById("hotel");
            hotelSelect.innerHTML = "";

            const hotelsForDestination = data.hotels.filter(hotel => hotel.destination === destination);
            if (hotelsForDestination.length === 0) {
                let option = document.createElement("option");
                option.textContent = "No hotels available";
                option.disabled = true;
                hotelSelect.appendChild(option);
                return;
            }

            hotelsForDestination.forEach(hotel => {
                let option = document.createElement("option");
                option.value = hotel.name;
                option.textContent = hotel.name;
                hotelSelect.appendChild(option);
            });
        })
        .catch(error => console.error("Error loading hotels:", error));
}

function startSlideshow() {
    let index = 0;
    const slides = document.querySelectorAll(".slide");
    
    function showSlide() {
        slides.forEach(slide => slide.style.display = "none");
        slides[index].style.display = "block";
        index = (index + 1) % slides.length;
    }
    
    if (slides.length > 0) {
        showSlide();
        setInterval(showSlide, 3000);
    }
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
