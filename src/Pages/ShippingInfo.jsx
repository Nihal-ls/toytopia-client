import React from 'react';
import { motion } from 'framer-motion';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Truck, Globe, Package, ShieldCheck } from 'lucide-react';
import 'leaflet/dist/leaflet.css';
// Fix for default marker icons in Leaflet
import L from 'leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import { Link } from 'react-router';

let DefaultIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

const ShippingInfo = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const stats = [
    { icon: <Globe className="text-purple-500" />, title: "Worldwide", desc: "Shipping to 50+ countries" },
    { icon: <Truck className="text-purple-500" />, title: "Fast Delivery", desc: "3-5 Business days" },
    { icon: <Package className="text-purple-500" />, title: "Secure Packing", desc: "Extra care for collectibles" },
    { icon: <ShieldCheck className="text-purple-500" />, title: "Tracked", desc: "Real-time updates" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Hero Section */}
      <section className="pt-20 pb-12 px-6 text-center">
        <motion.span 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="bg-purple-100 text-purple-600 px-4 py-1 rounded-full text-sm font-bold tracking-wide uppercase"
        >
          Logistics & Delivery
        </motion.span>
        <motion.h1 
          {...fadeIn}
          className="text-4xl md:text-6xl font-extrabold mt-4 mb-6"
        >
          Toys Delivered to <span className="text-purple-600">Your Doorstep</span>
        </motion.h1>
        <motion.p {...fadeIn} className="max-w-2xl mx-auto text-slate-600 text-lg">
          We ensure your favorite collectibles and toys reach you safely, 
          no matter where you are in the world.
        </motion.p>
      </section>

      {/* Stats/Features Grid */}
      <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 px-6 mb-20">
        {stats.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center text-center hover:shadow-md transition-shadow"
          >
            <div className="p-3 bg-purple-50 rounded-2xl mb-4">{item.icon}</div>
            <h3 className="font-bold text-lg">{item.title}</h3>
            <p className="text-slate-500 text-sm">{item.desc}</p>
          </motion.div>
        ))}
      </section>

      {/* Map Section */}
      <section className="max-w-7xl mx-auto px-6 mb-20">
        <div className="bg-white rounded-[2rem] shadow-xl overflow-hidden border border-white p-4">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Map UI */}
            <div className="w-full md:w-2/3 h-[450px] rounded-2xl overflow-hidden z-0">
              <MapContainer center={[23.8103, 90.4125]} zoom={5} scrollWheelZoom={false} className="h-full w-full">
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[23.8103, 90.4125]}>
                  <Popup>ToyTopia Main Hub - Dhaka</Popup>
                </Marker>
              </MapContainer>
            </div>

            {/* Side Info */}
            <div className="w-full md:w-1/3 flex flex-col justify-center pr-4">
              <h2 className="text-3xl font-bold mb-4">Live Tracking Hubs</h2>
              <p className="text-slate-600 mb-6">
                Our main distribution centers are strategically located to minimize shipping times. 
                Select a region to see estimated delivery windows.
              </p>
              <div className="space-y-4">
                <div className="p-4 bg-slate-50 rounded-xl border-l-4 border-purple-500">
                  <p className="font-bold">Asia & Oceania</p>
                  <p className="text-sm text-slate-500">Est: 2-4 Days</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl border-l-4 border-slate-300">
                  <p className="font-bold">Europe & Americas</p>
                  <p className="text-sm text-slate-500">Est: 5-8 Days</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-slate-900 text-white py-16 px-6 text-center">
        <h2 className="text-3xl font-bold mb-6">Ready to expand your collection?</h2>
        <Link to="/" className="bg-purple-600 hover:bg-purple-500 text-white px-8 py-3 rounded-full font-bold transition-all transform hover:scale-105">
          Go Back to Store
        </Link>
      </section>
    </div>
  );
};

export default ShippingInfo;