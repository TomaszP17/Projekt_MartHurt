import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white py-8 mt-5">
      <div className="container mx-auto px-4 space-y-6 md:space-y-0 md:flex md:justify-between">
        <div className="space-y-4 md:w-1/4">
          <h2 className="text-xl font-bold">ProfPlotter</h2>
          <p className="text-sm">EQUIPMENT FOR WIDE FORMAT PRINTING</p>
          <div className="flex space-x-4">
            <a href="#"><img src="/path/to/youtube-icon.png" alt="YouTube" className="w-6 h-6"/></a>
            <a href="#"><img src="/path/to/telegram-icon.png" alt="Telegram" className="w-6 h-6"/></a>
          </div>
        </div>
        <div className="flex flex-wrap space-y-6 md:space-y-0 md:space-x-8 md:w-3/4">
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/6">
            <h3 className="font-bold">Catalog</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#">Equipment</a></li>
              <li><a href="#">Ink</a></li>
              <li><a href="#">Parts</a></li>
              <li><a href="#">Brands</a></li>
            </ul>
          </div>
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/6">
            <h3 className="font-bold">About Us</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#">Our Experience</a></li>
              <li><a href="#">News</a></li>
              <li><a href="#">Certificates</a></li>
              <li><a href="#">Careers</a></li>
            </ul>
          </div>
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/6">
            <h3 className="font-bold">Service</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#">Engineer Call</a></li>
              <li><a href="#">Maintenance</a></li>
              <li><a href="#">Technical Instructions</a></li>
            </ul>
          </div>
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/6">
            <h3 className="font-bold">For Buyers</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#">Demo Room</a></li>
              <li><a href="#">Leasing</a></li>
              <li><a href="#">Articles</a></li>
              <li><a href="#">Contacts</a></li>
            </ul>
          </div>
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/6">
            <h3 className="font-bold">Contacts</h3>
            <ul className="space-y-2 text-sm">
              <li><strong>Phone:</strong> +7 (495) 414-26-08</li>
              <li>+7 (925) 488-42-98</li>
              <li><strong>WhatsApp:</strong> +7 (925) 488-42-98</li>
              <li><strong>Email:</strong> info@profplotter.ru</li>
              <li>zaka@profplotter.ru</li>
              <li><strong>Address:</strong> g. Korolev, ul. Frunze, d.1A of.228</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="container mx-auto mt-8 text-center border-t border-gray-700 pt-4">
        <p className="text-xs">&copy;2024 Marthurt</p>
        <div className="flex justify-center space-x-4 mt-2 text-xs">
          <a href="#">Site Map</a>
          <a href="#">Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
