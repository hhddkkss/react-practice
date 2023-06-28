import React from 'react'
import { useState, useEffect } from 'react'

import axios from 'axios'
import { PEXELS_CURATED, PEXELS_SEARCH } from '../Api/Pexels'

import Button from '@mui/material/Button'
import Alert from '@mui/material/Alert'

import '../styles/randomImage/randomimage.css'

function RandomImage() {
    const [imgData, setImgData] = useState([]) //照片
    const [keyword, setKeyword] = useState('') // 搜尋關鍵字
    const [errorAlert, setErrorAlert] = useState(false)
    const [nowPage, setNowPage] = useState(1)
    const [isCurated, setIsCurated] = useState(false)

    const auth = 'EFvMns2o8lhS5k87psB0RZNsyNbkCi1lQI8r2OZPYfdhXHvHfel4bIfp'

    async function getImg() {
        const perPage = 30
        const randomPage = Math.floor(Math.random() * 50) + 1
        const res = await axios
            .get(PEXELS_CURATED + `?page=${randomPage}&per_page=${perPage}`, {
                headers: {
                    Authorization: auth,
                },
            })
            .catch((e) => console.log(e))
        setIsCurated(true)
        setImgData(res.data.photos) //照片
    }

    async function searchImg() {
        if (keyword.trim().length > 0) {
            setErrorAlert(false)
            setNowPage(1)
            setIsCurated(false)
            const res = await axios
                .get(PEXELS_SEARCH + `?query=${keyword}`, {
                    headers: {
                        Authorization: auth,
                    },
                })
                .catch((e) => console.log(e))
            setImgData(res.data.photos)
        } else {
            setErrorAlert(!errorAlert)
        }
    }

    async function loadMore(nowPage) {
        const res = await axios
            .get(PEXELS_SEARCH + `?query=${keyword}&page=${nowPage + 1}`, {
                headers: {
                    Authorization: auth,
                },
            })
            .catch((e) => console.log(e))
        setImgData([...imgData, ...res.data.photos])
    }

    function handleLoadMore() {
        setNowPage((prev) => prev + 1)
        loadMore(nowPage)
    }

    return (
        <>
            <section className="imageWeb">
                <h1>練習串pexels api</h1>
                <Button
                    variant="contained"
                    onClick={getImg}
                    color="secondary"
                    style={{ marginBottom: '1rem' }}
                >
                    精選圖片
                </Button>
                <br />
                <input
                    className="searchInput"
                    type="text"
                    onChange={(e) => {
                        setKeyword(e.target.value)
                    }}
                />
                <Button
                    variant="contained"
                    onClick={searchImg}
                    color="success"
                    style={{ marginBottom: '1rem' }}
                >
                    搜尋圖片
                </Button>
                <div className="imgArea">
                    {imgData &&
                        imgData.map((v, i) => {
                            return (
                                <div className="images" key={v.id}>
                                    <div className="imageWrap">
                                        <img
                                            src={v.src.original}
                                            alt={v.alt}
                                            className="myImg"
                                        />
                                    </div>
                                    <p className="imgTitle">{v.alt}</p>
                                </div>
                            )
                        })}
                    {errorAlert ? (
                        <Alert
                            severity="error"
                            onClose={() => {
                                setErrorAlert(false)
                            }}
                        >
                            搜尋必須要輸入關鍵字
                        </Alert>
                    ) : (
                        ''
                    )}
                </div>
                {isCurated ? (
                    ''
                ) : (
                    <Button
                        variant="contained"
                        onClick={handleLoadMore}
                        color="success"
                    >
                        加載更多
                    </Button>
                )}
            </section>
        </>
    )
}

export default RandomImage
