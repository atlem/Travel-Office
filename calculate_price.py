import json

def calculate_price(destination, hotel, nights):
    with open("data.json", "r") as file:
        data = json.load(file)
    
    destination_price = next(d["price"] for d in data["destinations"] if d["name"] == destination)
    hotel_price = next(h["price"] for h in data["hotels"] if h["name"] == hotel)
    
    total_price = (destination_price + hotel_price) * nights
    return total_price

if __name__ == "__main__":
    destination = input("Enter destination: ")
    hotel = input("Enter hotel: ")
    nights = int(input("Enter number of nights: "))
    
    price = calculate_price(destination, hotel, nights)
    print(f"Total Price: ${price}")
