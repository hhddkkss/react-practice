import React, { useState, useEffect, useRef } from 'react'
import '../styles/passwordGenerator/passwordGenerator.css'

function PasswordGenerator() {
    const [length, setLength] = useState(8)
    const [password, setPassword] = useState('')
    const [lower, setLower] = useState(true)
    const [upper, setUpper] = useState(false)
    const [number, setNumber] = useState(false)
    const [symbol, setSymbol] = useState(false)

    const progressRef = useRef(null)

    const lowerLetter = [
        'a',
        'b',
        'c',
        'd',
        'e',
        'f',
        'g',
        'h',
        'i',
        'j',
        'k',
        'l',
        'm',
        'n',
        'o',
        'p',
        'q',
        'r',
        's',
        't',
        'u',
        'v',
        'w',
        'x',
        'y',
        'z',
    ]
    const upperLetter = [
        'A',
        'B',
        'C',
        'D',
        'E',
        'F',
        'G',
        'H',
        'I',
        'J',
        'K',
        'L',
        'M',
        'N',
        'O',
        'P',
        'Q',
        'R',
        'S',
        'T',
        'U',
        'V',
        'W',
        'X',
        'Y',
        'Z',
    ]
    const numberLetter = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
    const symbolLetter = ['!', '@', '*', '%', '$', '#']

    function makePassword(length) {
        let str = ''
        for (let i = 0; i < length; i++) {
            const index = Math.floor(Math.random() * 26)
            str += lowerLetter[index]
        }
        return str
    }
    function buildWithUpperLetter(str) {
        let newStr = str.split('')
        if (upper) {
            for (let i = 0; i < newStr.length; i++) {
                const randomStrIndex = Math.floor(Math.random() * newStr.length)
                const randomIndex = Math.floor(Math.random() * 26)
                newStr[randomStrIndex] = upperLetter[randomIndex]
            }
        }
        return newStr.join('')
    }

    function buildWithNumber(str) {
        let newStr = str.split('')
        if (number) {
            for (let i = 0; i < 10; i++) {
                const randomStrIndex = Math.floor(Math.random() * newStr.length)
                const randomIndex = Math.floor(Math.random() * 10)
                newStr[randomStrIndex] = numberLetter[randomIndex]
            }
        }
        return newStr.join('')
    }

    function buildWithSymbol(str) {
        let newStr = str.split('')
        if (symbol) {
            for (let i = 0; i < 5; i++) {
                const randomStrIndex = Math.floor(Math.random() * newStr.length)
                const randomIndex = Math.floor(Math.random() * 6)
                newStr[randomStrIndex] = symbolLetter[randomIndex]
            }
        }
        return newStr.join('')
    }

    function copy() {
        navigator.clipboard.writeText(password)
    }

    useEffect(() => {
        //小寫的為必選
        setLower(true)
    }, [])

    useEffect(() => {
        let myPassword = makePassword(length)
        myPassword = buildWithUpperLetter(myPassword)
        myPassword = buildWithNumber(myPassword)
        myPassword = buildWithSymbol(myPassword)
        setPassword(myPassword)

        //進度條顏色
        progressRef.current.style.width = length * 3.33 + '%'
        if (length <= 5) {
            progressRef.current.style.background = 'red'
        } else if (length > 5 && length <= 12) {
            progressRef.current.style.background = 'rgb(211, 192, 26)'
        } else if (length > 12 && length <= 18) {
            progressRef.current.style.background = 'orange'
        } else {
            progressRef.current.style.background = 'green'
        }
    }, [length, lower, upper, number, symbol])

    return (
        <div className="wrap">
            <div className="box">
                <h2 className="title">PasswordGenerator</h2>
                <textarea value={password} readOnly onClick={copy} />
                <div className="complex-progress" ref={progressRef}></div>
                <h3 className="secondTitle">PasswordLength</h3>
                <p className="length">{length}</p>
                <input
                    type="range"
                    min={1}
                    max={30}
                    value={length}
                    step={1}
                    onChange={(e) => {
                        setLength(e.target.value)
                    }}
                />

                <h3 className="secondTitle">PasswordSetting</h3>
                <div className="settingWrapper">
                    <div className="inputField">
                        <label htmlFor="lowercase">
                            <input
                                type="checkbox"
                                name="lowercase"
                                id="lowercase"
                                checked={lower}
                                onChange={(e) => {
                                    setLower(true)
                                }}
                            />
                            *LowerCase(a-z)
                        </label>

                        <label htmlFor="uppercase">
                            <input
                                type="checkbox"
                                name="uppercase"
                                id="uppercase"
                                checked={upper}
                                onChange={(e) => {
                                    setUpper(e.target.checked)
                                }}
                            />
                            UpperCase(A-Z)
                        </label>
                    </div>
                    <br />

                    <div className="inputField">
                        <label htmlFor="number">
                            <input
                                type="checkbox"
                                name="number"
                                id="number"
                                checked={number}
                                onChange={(e) => {
                                    setNumber(e.target.checked)
                                }}
                            />
                            Number(1-9)
                        </label>

                        <label htmlFor="symbol">
                            <input
                                type="checkbox"
                                name="symbol"
                                id="symbol"
                                checked={symbol}
                                onChange={(e) => {
                                    setSymbol(e.target.checked)
                                }}
                            />
                            Symbol(!@*%$#)
                        </label>
                    </div>
                </div>
                <button className="getPassword" onClick={copy}>
                    Copy Password
                </button>
            </div>
        </div>
    )
}

export default PasswordGenerator
