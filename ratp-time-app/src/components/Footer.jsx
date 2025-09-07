import React from 'react';

function Footer() {
  return (
    <footer className="bg-black text-gray-400 p-4 mt-auto">
      <div className="container mx-auto text-center">
        &copy; {new Date().getFullYear()} Metro Times App. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
