import React from 'react'
import SideMenu from '../sidemanu'
import Footer from '../Footer'

function AdminLayout(props:any) {
  return (
    <main className='flex bg-zinc-100'>
      <SideMenu active={props.active}/>
        <div className='flex flex-col flex-grow w-full pb-14 relative min-h-screen overflow-x-hidden'>
          <div className='p-10 px-14 '>{props.children}</div>
          <Footer/>
        </div>
    </main>
  )
}

export default AdminLayout
