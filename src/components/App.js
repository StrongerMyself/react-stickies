import React from 'react'
import Board from './Board'

import data from '../data'

function App() {
    return (
        <div>
            <Board stikers={data}/>
        </div>
    )
}

export default App