import React from 'react';

const AdminPage: React.FC = () => {
    return (

<div className='bg-orange-50 w-full h-screen p-5 '>
    <div className='w-full flex justify-end'>
        <p className='bg-red-800 text-white rounded-xl p-2 font-bold'>Admin Pannel</p>
    </div>


</div>



        // <div style={{ padding: '20px' }}>
        //     <h1>Admin </h1>
        //     <div style={{ marginTop: '20px' }}>
        //         <button style={{ marginRight: '10px' }}>Add Event</button>
        //         <button>Edit Event</button>
        //     </div>
        //     <div style={{ marginTop: '20px' }}>
        //         <table>
        //             <thead>
        //                 <tr>
        //                     <th>ID</th>
        //                     <th>Event Name</th>
        //                     <th>Date</th>
        //                     <th>Actions</th>
        //                 </tr>
        //             </thead>
        //             <tbody>
        //                 {/* Example row */}
        //                 <tr>
        //                     <td>1</td>
        //                     <td>Sample Event</td>
        //                     <td>2025-01-01</td>
        //                     <td>
        //                         <button style={{ marginRight: '10px' }}>Edit</button>
        //                         <button>Delete</button>
        //                     </td>
        //                 </tr>
        //             </tbody>
        //         </table>
        //     </div>
        // </div>
    );
};

export default AdminPage;