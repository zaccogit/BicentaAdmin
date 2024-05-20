'use client'
import { useRender } from '@/context/render/renderProvider'
import { useStore } from '@/context/storeContext/StoreProvider'
import { getExpresion, getIntentions, getResponses } from '@/lib/httpRequest'
import { Intentions, UserExpresions, UserResponses } from '@/lib/interface.intentions'
import React, { useEffect } from 'react'

function DataConsult() {
    const {  setIntentions , setUserExpresions, setUserResponses } = useStore()
    const { setLoader } = useRender()
    useEffect(() => {
        (async () => {
          setLoader(true)
          try {
            const req = await getIntentions() as Intentions
            const req2 = await getExpresion() as UserExpresions
            const req3 = await getResponses() as UserResponses
            setIntentions(req)
            setUserExpresions(req2.filter(e => !e.intents?.length))
            setUserResponses(req3)
            
          } catch (error) {
            
          }finally{
            setLoader(false)
          }
           
        })()
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [])
  return (
    <></>
  )
}

export default DataConsult