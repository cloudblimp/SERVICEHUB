import { Carousel } from "@material-tailwind/react";

export function CarouselDefault() {
  return (
    <Carousel loop autoplay>
      <img
        src="https://images.pexels.com/photos/4099467/pexels-photo-4099467.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        alt=""
        className="h-full w-full object-cover"
      />
      <img
        src="https://images.unsplash.com/photo-1589241534732-26031c00f37c?q=80&w=1991&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt=""
        className="h-full w-full object-cover"
      />
      <img
        src="https://images.pexels.com/photos/3993447/pexels-photo-3993447.jpeg"
        alt=""
        className="h-full w-full object-cover"
      />
    </Carousel>
  );
}
