import AdminLayout from '@/components/layouts/AdminLayout'
import Shclist from '@/components/Shclist'
import React from 'react'

const page = () => {
  return (
        <AdminLayout active={"Articles"}>

    <div>
      <Shclist/>
    </div>
        </AdminLayout>

  )
}

export default page
