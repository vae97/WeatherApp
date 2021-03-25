import React, {useEffect, useRef} from "react";
import lottie from 'lottie-web';


export default function Animation(){

    const container =useRef(null);

    useEffect(()=>{

        lottie.loadAnimation({
            container:container.current,
            renderer: "svg",
            loop: true,
            autoplay: true,
            animationData: require('../src/weather.json')
        })
    },[])


    return(
        <div>
            <div ref={container}></div>
        </div>
    )
}
