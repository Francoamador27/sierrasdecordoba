import { FallingLines } from "react-loader-spinner"

export const Loading = ()=>{
    return (
        <>
            <section className="spinner-loading">
            <FallingLines
                color="#015089"
                width="100"
                visible={true}
                ariaLabel="falling-circles-loading"
                />
            </section>        
        </>
    )
}