import PageRecipes from './jsx/PageRecipes.jsx'
import PageFactory from './jsx/PageFactory.jsx'
import { useState } from 'react';
import React from 'react';
import MissingRecipesLogger from './jsx/MissingRecipesLogger.jsx';
import { ReactFlowProvider } from '@xyflow/react';

function App() {
  let [page, setPage] = useState('recipes');

  let page_jsx = <p>Как ты тут оказался? *-*</p>;
  if (page == 'recipes') {
    page_jsx = <PageRecipes/>;
  }
  else if (page == 'factory') {
    page_jsx = <PageFactory/>;
  }

  return <>
    <ReactFlowProvider>
      {page_jsx}
    </ReactFlowProvider>
    <div className="page-selector">
      <div 
        className={page == 'recipes' ? 'selected' : ''}
        onClick={() => {
          setPage('recipes');
        }}>Recipes</div>
      <div 
        className={page == 'factory' ? 'selected' : ''}
        onClick={() => {
          setPage('factory');
        }}>Factory</div>
    </div>
    <div className="floating">
      <MissingRecipesLogger />
    </div>
  </>;
}

export default App;