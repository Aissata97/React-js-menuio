import React from 'react'
import ReactLoading from 'react-loading'
import '../css/loading.css'

const Loading = () => (
    <div className='loading'>
        <p>Veuillez patienter...</p>
        <ReactLoading
            type = 'spin'
            color = '#00000'
        />
    </div>
)

export default Loading