document.addEventListener("DOMContentLoaded", function () {
    fetch("data.json")
        .then(response => response.json())
        .then(data => {
            const destinationSelect = document.getElementById("destination");
            const hotelSelect = document.getElementById("hotel");

            data.destinations.forEach(destination => {
                let option = document.createElement("option");
                option.value = destination.name;
                option.textContent = destination.name;
                destinationSelect.appendChild(option);
            });

            data.hotels.forEach(hotel => {
                let option = document.createElement("option");
                option.value = hotel.name;
                option.textContent = hotel.name;
                hotelSelect.appendChild(option);
            });
        });
});

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
