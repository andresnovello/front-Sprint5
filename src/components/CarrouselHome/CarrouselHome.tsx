import { Carousel } from "react-bootstrap"


const CarrouselHome = () => {
    return (
        <>
            <Carousel>
                <Carousel.Item interval={3000}>
                    <img
                        className='d-block w-100'
                        style={{ maxHeight: "450px", objectFit: 'cover' }}
                        src='images/Hamburguesa5.jpg'
                        alt='hamburguesapremium'
                    />
                    <Carousel.Caption>
                        <h3>Hamburguesa Premium</h3>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={3000}>
                    <img
                        className='d-block w-100'
                        style={{ maxHeight: "450px", objectFit: 'cover' }}
                        src="images/pizza1.avif"
                        alt='pizza1'
                    />

                    <Carousel.Caption>
                        <h3>Pizza Napolitana</h3>
                    </Carousel.Caption>
                </Carousel.Item>

                <Carousel.Item interval={3000}>
                    <img
                        className='d-block w-100'
                        style={{ maxHeight: "450px", objectFit: 'cover' }}
                        src="images/pizza2.avif"
                        alt='pizza2'
                    />

                    <Carousel.Caption>
                        <h3>Pizza Clásica</h3>
                    </Carousel.Caption>
                </Carousel.Item>

                <Carousel.Item interval={3000}>
                    <img
                        className='d-block w-100'
                        style={{ maxHeight: "450px", objectFit: 'cover' }}
                        src="images/hamburguesa2.avif"
                        alt='hamburguesaclasica'
                    />
                    <Carousel.Caption>
                        <h3>Hamburguesa Clásica</h3>
                    </Carousel.Caption>
                </Carousel.Item>

            </Carousel>
        </>
    )
}

export default CarrouselHome