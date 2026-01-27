import { Button } from "../../../../UI/Button";

export default function Hero({}) {
  return (
    <section className="w-full h-[80vh] flex flex-col justify-center items-center bg-[url('/banner.jpg')] bg-cover bg-center text-white">
      <h1 className="text-8xl font-bold mb-4 text-center text-white">Bienvenidos a Nuestra Iglesia</h1>
      <p className="text-2xl mb-6 text-center ">Un lugar para crecer en fe y comunidad</p>
     
    </section>
  );
}