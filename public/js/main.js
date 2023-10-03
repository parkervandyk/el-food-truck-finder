let map;

function initMap() {
  map = L.map('map').setView([37.7749, -122.4194], 13); // shows San Francisco by default
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

  // Check for 'cuisine' query parameter and fetch food trucks if it exists
  const urlParams = new URLSearchParams(window.location.search);
  const cuisineType = urlParams.get('cuisine');
  if (cuisineType) {
    fetchFoodTrucks(cuisineType);
  }
}

function fetchFoodTrucks(cuisineType) {
  fetch(`/foodtrucks?cuisine=${cuisineType}`)
    .then((response) => response.json())
    .then((data) => {
      data.forEach((truck) => {
        if (truck.Latitude && truck.Longitude) {
          L.marker([truck.Latitude, truck.Longitude])
            .addTo(map)
            .bindPopup(
              `<strong>${truck.Applicant}</strong><br>${truck.FoodItems}`
            );
        }
      });
    })
    .catch((error) => {
      console.error('Error fetching food trucks:', error);
    });
}

function searchTrucks() {
  const cuisineType = document.getElementById('cuisineInput').value;
  window.location.href = `/index.html?cuisine=${encodeURIComponent(
    cuisineType
  )}`;
}

initMap();
