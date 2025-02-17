document.addEventListener("DOMContentLoaded", function () {
    fetch("data.json")
        .then(response => response.json())
        .then(data => {
            const destinationSelect = document.getElementById("destination");
            const hotelSelect = document.getElementById("hotel");
            const travelSelect = document.getElementById("travel");
            const destinationList = document.getElementById("destination-list");
            const slideshow = document.getElementById("slideshow");
            const bookingSection = document.getElementById("booking");

            data.destination.forEach(destination => {
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

            ["Train", "Bus", "Flight", "Teleport"].forEach(mode => {
                let option = document.createElement("option");
                option.value = mode.toLowerCase();
                option.textContent = mode;
                travelSelect.appendChild(option);
            });
        });
});

function calculatePrice() {
    fetch("data.json")
        .then(response => response.json())
        .then(data => {
            const destination = document.getElementById("destination").value;
            const hotel = document.getElementById("hotel").value;
            const travel = document.getElementById("travel").value;
            const nights = parseInt(document.getElementById("nights").value);
            
            const destinationPrice = data.destinations.find(d => d.name === destination).price;
            const hotelPrice = data.hotels.find(h => h.name === hotel).price;
            const travelCost = travel === "teleport" ? 500 : 50;
            
            const totalPrice = (destinationPrice + hotelPrice + travelCost) * nights;
            
            document.getElementById("priceOutput").textContent = `Total Price: $${totalPrice}`;
        });
}
