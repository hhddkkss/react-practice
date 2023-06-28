import { Button } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

//https://hhddkkss.github.io/react-practice
const path = {
    Home: '/home',
    imageWeb: '/img',
    passwordGenerator: '/password_generator',
}

const title = ['Home', 'imageWeb', 'passwordGenerator']

function Navbar() {
    const navigation = useNavigate()

    const handleClick = (v) => {
        navigation(path[v])
    }
    return (
        <nav>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '2rem',
                }}
            >
                {title.map((v, i) => (
                    <Button
                        variant="contained"
                        key={i}
                        onClick={() => handleClick(v)}
                    >
                        {v}
                    </Button>
                ))}
            </div>
        </nav>
    )
}

export default Navbar
