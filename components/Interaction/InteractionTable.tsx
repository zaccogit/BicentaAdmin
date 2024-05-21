'use client'
import Table from 'rc-table';
import React, { useEffect, useState } from 'react';
import Pagination from "react-js-pagination";
import ModalUserExpresions from '../common/ModalUserExpresions';
import ModalUserResponse from '../common/ModalUserResponse';
import { getExpresion, getIntentions, getResponses } from '@/lib/httpRequest';
import { Intention, Intentions, UserExpresions, UserResponses } from '@/lib/interface.intentions';
import { useStore } from '@/context/storeContext/StoreProvider';
import { useRender } from '@/context/render/renderProvider';
import axios from 'axios';
import { ToastCall } from '@/utils/GeneralMetods';
import { IoIosAlert } from 'react-icons/io';


const InteractionTable = () => {
    const { Intentions, setIntentions ,setUserExpresions,setUserResponses } = useStore()
    const [modal, setModal] = useState(false);
    const [modal2, setModal2] = useState(false);
    const [Intent, setIntent] = useState<Intention>()
    const { setLoader } = useRender()

      //Pagination
      const itemsPerPage = 10;
      const [activePage, setActivePage] = useState(1)
      const handlePageChange = (pageNumber:any)=>{
        setActivePage(pageNumber)
      }

      const totalPages = Math.ceil(Intentions.length / itemsPerPage);
      const startIndex = (activePage - 1) * itemsPerPage;
      const currentItems = Intentions.slice(startIndex, startIndex + itemsPerPage);

    const deleteData = async (e: Intention) => {
      setLoader(true)
      try {
        await axios.delete("/api/intention/"+e.id);
  
        setIntentions(Intentions.filter(ele => e.id !== ele.id))
  
        ToastCall("success", "Eliminado guardados con exito ");
      } catch (error: any) {
        console.log(error, "aqui");
        if (error.status === 400) {
          ToastCall("error", "Usuario o Contraseña invalida");
          return;
        }
        ToastCall("error", error);
      } finally {
        setLoader(false)
      }
    };
    const columns = [
        {
          title: 'Interacción',
          dataIndex: 'name',
          key: 'name',
          width: 400,
          className:"p-2 border-r-2 border-b-2 text-center w-2/3",
          rowClassName:"bg-black-ripon"
        },
       /*  {
          title: 'Total Subcategory',
          dataIndex: 'subCount',
          key: 'subCount',
          width: 400,
          className:"p-2 border-r-2 border-b-2"
        },
        {
          title: 'Total Product',
          dataIndex: 'productCount',
          key: 'productCount',
          width: 400,
          className:"p-2 border-r-2 border-b-2"
        }, */
        {
          title: 'Operations',
          dataIndex: '',
          key: 'operations',
          className:"p-2 border-r-2 border-b-2 w-1/3",
          render: (data:Intention) => <div className="join">
          <button className="btn join-item btn-success font-bold" onClick={() => {
            setIntent(data)
            setTimeout(() => {
                setModal(true)
            }, 100);
            }}>Estimulo 
            {
              !data.userExpresions.length
              ?<IoIosAlert size={24}  color='red'/>
              :null
            }
            </button>
          <button className="btn join-item btn-warning font-bold" onClick={()=> {
            setIntent(data)
            setTimeout(() => {
                setModal2(true)
            }, 100);
            }} >Respuestas
             {
              !data.userResponses.length
              ?<IoIosAlert size={24}  color='red'/>
              :null
            }
            
            </button>
          <button className="btn join-item btn-error font-bold" onClick={() => deleteData(data)}>Eliminar</button>
        </div>,
          
        },
      ];

      useEffect(() => {
        (async () => {
          setLoader(true)
          try {
            const req = await getIntentions() as Intentions
            const req2 = await getExpresion() as UserExpresions
            const req3 = await getResponses() as UserResponses
            setIntentions(req)
            setUserExpresions(req2.filter(e => !e.intents?.length))
            console.log(req3)
            setUserResponses(req3)
            
          } catch (error) {
            
          }finally{
            setLoader(false)
          }
           
        })()
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [])
      

    return (
        <>
        <Table columns={columns} data={currentItems} rowKey={data => data.id}  className='rounded-lg border border-gray-100 py-3 shadow-sm rc-table-custom'/>
        <Pagination
          activePage={activePage}
          itemsCountPerPage={itemsPerPage}
          totalItemsCount={Intentions.length}
          pageRangeDisplayed={totalPages}
          onChange={handlePageChange}
          nextPageText={"Sig"}
          prevPageText={"Prev"}
          innerClass="js-ul"
          itemClass="js-li"
          linkClass="page-link"
        />
        <ModalUserExpresions  modal={modal} setModal={setModal} headerTitle={"Estimulo"} data={Intent} />
        <ModalUserResponse  modal={modal2} setModal={setModal2} headerTitle={"Respuestas"} data={Intent}/>
        </>
        
    );
};

export default InteractionTable;