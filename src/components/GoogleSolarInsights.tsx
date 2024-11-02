// import React, { useEffect, useState } from 'react';
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';
// import L from 'leaflet';

// // Fix for default marker icon
// delete (L.Icon.Default.prototype as any)._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
//   iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
//   shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
// });

// interface LocationMapProps {
//   address: string;
// }

// export default function LocationMap({ address }: LocationMapProps) {
//   const [coordinates, setCoordinates] = useState<[number, number] | null>(null);

//   useEffect(() => {
//     if (address) {
//       fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`)
//         .then(response => response.json())
//         .then(data => {
//           if (data && data[0]) {
//             setCoordinates([parseFloat(data[0].lat), parseFloat(data[0].lon)]);
//           }
//         })
//         .catch(error => console.error('Error fetching coordinates:', error));
//     }
//   }, [address]);

//   if (!coordinates) {
//     return null;
//   }

//   return (
//     <div className="h-[400px] rounded-lg overflow-hidden shadow-lg">
//       <MapContainer
//         center={coordinates}
//         zoom={16}
//         style={{ height: '100%', width: '100%' }}
//       >
//         <TileLayer
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//         />
//         <Marker position={coordinates}>
//           <Popup>
//             Your Property<br />
//             {address}
//           </Popup>
//         </Marker>
//       </MapContainer>
//     </div>
//   );
// }