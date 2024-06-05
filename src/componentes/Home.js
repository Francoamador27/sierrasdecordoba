import { useState } from "react";
import Listado from "./Listado";
import { BannerMain } from "./banner/banneMain";

export function Home() {
    const [showProducts, setShowProducts] = useState(true);
    return (
        <>
            <BannerMain />
            <section className="home-page">
                <div className="main-content-home">

                    {showProducts &&
                        <>
                            <h3 className="title-list">Propiedades Destacadas en Alquiler Temporal</h3>
                            <Listado category="alquiler-temporal" order="asc" onProductsLoaded={setShowProducts} />
                        </>

                    }
                    <h3 className="title-list">Venta de terrenos</h3>
                    <Listado category="venta-de-terrenos" />
                    <h3 className="title-list">Propiedades Destacadas en Venta</h3>
                    <Listado category="venta-de-propiedades" />
                </div>

                <div className='adds adds-right'>
                    <h3>Premium
                    </h3>
                    <p>Publicicdad sdafadsfasdfsafsadfadfsafadsfadsfas</p>
                </div>
            </section>
        </>
    )
}