from flask import Flask, request, jsonify

app = Flask(__name__)

# Sample data
DATA = {
    "destinations": [
        {"name": "Decryptia", "price": 200},
        {"name": "Vermillion", "price": 300},
        {"name": "Oblivion Bay", "price": 250}
    ],
    "hotels": [
        {"name": "Encryptia Grand Hotel", "price": 100, "destination": "Decryptia"},
        {"name": "Decryptia Lodge", "price": 80, "destination": "Decryptia"},
        {"name": "Vermillion Suites", "price": 120, "destination": "Vermillion"},
        {"name": "Oblivion Retreat", "price": 90, "destination": "Oblivion Bay"}
    ],
    "travel_modes": [
        {"name": "Train", "price": 50},
        {"name": "Bus", "price": 50},
        {"name": "Flight", "price": 100},
        {"name": "Teleport", "price": 500}
    ]
}

@app.route("/calculate_price", methods=["POST"])
def calculate_price():
    data = request.json
    destination_name = data.get("destination")
    hotel_name = data.get("hotel")
    travel_mode = data.get("travel")
    nights = int(data.get("nights", 1))

    destination = next((d for d in DATA["destinations"] if d["name"] == destination_name), None)
    hotel = next((h for h in DATA["hotels"] if h["name"] == hotel_name), None)
    travel = next((t for t in DATA["travel_modes"] if t["name"].lower() == travel_mode.lower()), None)

    if not destination or not hotel or not travel:
        return jsonify({"error": "Invalid selection"}), 400

    total_price = (destination["price"] + hotel["price"] + travel["price"]) * nights

    return jsonify({"total_price": total_price})

if __name__ == "__main__":
    app.run(debug=True)
