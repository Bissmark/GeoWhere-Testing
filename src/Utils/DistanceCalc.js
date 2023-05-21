// Calculates the distance as the Crow flies
export const calcCrow = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // km
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    lat1 = toRad(lat1);
    lat2 = toRad(lat2);
  
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;
    return d;
  }
  
function toRad(value) {
    return (value * Math.PI) / 180;
}

function calculateBonus(km) {
    const temp = Math.pow(((km + 100) / km) * 0.2, 6) * 4000;
    return Math.round(temp > 1 ? 10000 : temp * 10000);
}

// Calculates the distance between 2 coordinates
export const calculateDistance = (lat1, lng1, lat2, lng2) => {
    let d = calcCrow(lat1, lng1, lat2, lng2);
    console.log(d);
    return calculateBonus(d);
}