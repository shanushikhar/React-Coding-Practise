import React, { useEffect, useState } from 'react'
const ITEM_PER_PAGE = 15

export default function Pagination() {

    const [prodData, setProdData] = useState([])
    const [page, setPage] = useState(1)
    const [total, setTotal] = useState(0)

    const fetchData = async () => {
        const res = await fetch(`https://dummyjson.com/products?limit=${ITEM_PER_PAGE}&skip=${page * ITEM_PER_PAGE - ITEM_PER_PAGE}`)
        const data = await res.json()
        setTotal(Math.ceil(data.total / ITEM_PER_PAGE))
        setProdData(data.products)
    }

    useEffect(() => {
        fetchData()
    }, [page])

    const handleData = async (selectedPage) => {
        setPage(selectedPage)
    }

    if (total === 0) {
        return <h1>Products loading...</h1>
    }

    return (
        <>
            <div style={{ display: "flex", height: "100%", flexWrap: "wrap" }}>
                {prodData.map(data => {
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
                {[...Array(total)].map((dd, i) => {
                    return (
                        <button key={i} style={{ backgroundColor: page === i + 1 && "pink", color: "red" }} onClick={() => handleData(i + 1)}>{i + 1}</button>
                    )
                }
                )}
                <button style={{ cursor: total === page ? "not-allowed" : "pointer", display: total === page && "none" }} onClick={() => setPage(page => page + 1)}>➡️</button>
            </div>
        </>
    )
}
