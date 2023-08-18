from flask import Flask, request, jsonify
import recommendation_system

app = Flask(__name__)

@app.route("/recommend", methods=["POST"])
def recommend_products():
    user_data = request.json  # User data sent from the frontend
    recommendations = recommendation_system.get_recommendations(user_data)
    return jsonify(recommendations)

if __name__ == "__main__":
    app.run(debug=True)
