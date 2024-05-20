import React from 'react';
import PageComponentTitle from '../common/PageComponentTitle';
import CategoryTable from './TrainingTable';

const Interaction = () => {
   
    return (
        <main className="p-6 sm:p-10 space-y-6">
        
        <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between">

             <div className="mr-6">
          <h1 className="text-4xl font-semibold mb-2">Training</h1>
          <h2 className="text-gray-600 ml-0.5">Vista de entrenamiento del cerebro</h2>
        </div>
  
        </div>

        <section className="grid md:grid-cols-1 xl:grid-cols-1 gap-6">
          
          <div className="flex-grow items-center p-8 bg-white shadow rounded-lg">
            <CategoryTable />
          </div>
                    
        </section>
        
       
      </main>
    );
};

export default Interaction;