import React, { useState } from 'react';
import CreateTemplate from './CreateTemplates';
import BrowseTemplates from './BrowseTemplates';

function App() {
  // Define state for managing navigation
  const [currentPage, setCurrentPage] = useState('choices');

  // Function to handle navigation to the create template page
  const navigateToCreateTemplate = () => {
    setCurrentPage('create');
  };

  // Function to handle navigation to the browse templates page
  const navigateToBrowseTemplates = () => {
    setCurrentPage('browse');
  };

  // Function to handle navigation back to the choices page
  const navigateBackToChoices = () => {
    setCurrentPage('choices');
  };

  // Render different pages based on the current page
  let content;
  if (currentPage === 'create') {
    content = <CreateTemplate navigateBack={navigateBackToChoices} />;
  } else if (currentPage === 'browse') {
    content = <BrowseTemplates navigateBack={navigateBackToChoices} />;
  } else {
    content = (
      <div className="h-screen flex justify-center items-center flex-col">
        
        <h1 className="text-9xl font-bold mb-8 bottom-8 relative drop-shadow-2xl">Fitness Tracker</h1>

        <p className=" text-lg bottom-12 relative font-semibold">by: Agos Borja, John Agustin, John Valencia</p>

        <div className="flex justify-center">
          <button
            onClick={navigateToCreateTemplate}
            className="bg-slate-900 text-white px-8 py-4 mr-4 rounded-lg shadow-md hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:ring-offset-gray-100"
          >
            Create Template
          </button>
          <button
            onClick={navigateToBrowseTemplates}
            className="bg-slate-900 text-white px-8 py-4 rounded-lg shadow-md hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:ring-offset-gray-100"
          >
            Browse Templates
          </button>
        </div>
      </div>
    );
  }

  return <div>{content}</div>;
}

export default App;
