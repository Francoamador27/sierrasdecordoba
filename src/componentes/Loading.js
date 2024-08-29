import { FallingLines } from "react-loader-spinner"
import { Player, Controls } from '@lottiefiles/react-lottie-player';

export const Loading = () => {

    return (
        <>
            <section className="spinner-loading">
                <Player
                    autoplay
                    loop
                    src="https://lottie.host/e89174da-0285-427e-bd58-270c861874a9/Hox96PPeIm.json"
                    style={{ height: '300px', width: '300px' }}
                >
                </Player>
                <p>Cargando... Disculpe las molestias</p>

            </section>
        </>
    )
}