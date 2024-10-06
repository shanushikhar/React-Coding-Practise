import React, { useEffect, useState } from 'react'

export default function Pagination() {

    const [prodData, setProdData] = useState([])
    const [page, setPage] = useState(1)

    const fetchData = async () => {
        const res = await fetch("https://dummyjson.com/products?limit=20")
        const data = await res.json()
        setProdData(data.products)
    }

    useEffect(() => {
        fetchData()
    }, [page])

    const handleData = async (selectedPage) => {
        setPage(selectedPage)
    }

    return (
        <>
            <div style={{ display: "flex", height: "100%", flexWrap: "wrap" }}>
                {prodData.slice((page * 5) - 5, page * 5).map(data => {
                    return (
                        <div style={{ width: 200 }} key={data.id}>
                            <div >
                                <p style={{ textAlign: "center" }}>{data.title}</p>
                                <img style={{ objectFit: "contain" }} width={200} height={200} src={data.images[0]} alt={data.brand} />
                            </div>
                        </div>
                    )
                })}
            </div>


            <div style={{ display: "flex", justifyContent: "space-around" }}>
                <button disabled={page === 1} style={{ cursor: page === 1 ? "not-allowed" : "pointer" }} onClick={() => setPage(page => page - 1)}>⬅️</button>
                {[...Array(prodData.length / 5)].map((dd, i) => {
                    return (
                        <button style={{ backgroundColor: page === i + 1 && "pink", color: "red" }} onClick={() => handleData(i + 1)}>{i + 1}</button>
                    )
                }
                )}
                <button style={{ cursor: prodData.length / 5 === page ? "not-allowed" : "pointer" }} disabled={prodData.length / 5 === page} onClick={() => setPage(page => page + 1)}>➡️</button>
            </div>
        </>
    )
}
