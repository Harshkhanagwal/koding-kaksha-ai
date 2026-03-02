import React, { useState } from 'react'
import './AdminPanel.css'
import UserTable from '../../../Components/userTable/Usertable'
import CreateUser from '../../../Components/createUser/CreateUser'
import Loader from '../../../Components/Loader/Loader'

const AdminPanel = () => {

    const [buttonPosition, setButtonPosition] = useState(1)
    const [loading, setLoading] = useState(true)
  return (
    <>
    
     <div className="page-header">
        <h1>Hii, Harsh khanagwal </h1>

         <div className="tab-buttons">
            <button className="tab-button" onClick={() => setButtonPosition(1)}>
                Users 
            </button>
            <button className="tab-button" onClick={() => setButtonPosition(2)}>
                Regester User 
            </button>
            <button className="tab-button" onClick={() => setButtonPosition(3)}>
                Raised issues 
            </button>
            <div className={`span-bg position-${buttonPosition}`}>

            </div>
        </div>
      </div>

      {
        loading && <Loader/> 
      }

      {
        buttonPosition === 1 ? <UserTable loading={loading} setLoading={setLoading} /> : <CreateUser/>
      }

        
    </>
  )
}

export default AdminPanel