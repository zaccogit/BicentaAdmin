import React from 'react';
import PageComponentTitle from '../common/PageComponentTitle';
import CategoryTable from './InteractionTable';

const Interaction = () => {
   
    return (
        <main className="p-6 sm:p-10 space-y-6">
        
        <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between">
            <PageComponentTitle 
                title='Interacción'
                titleDescription='Vista de las interacciones para los usuarios'
                buttonTitle='Crear nueva interaccion'
            />
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