"use client";

import Hero from "./hero";
import Events from "./events";
import Testimonies from "./Testimonies";
import BlogPosts from "./BlogPost";
import HomeC from "./HomeConfig";

import CallToAction from "../../../../UI/CallToAction"; 
import PostsSummary from "./PostSummary";
import { useHomeData } from "../../Hooks/useHomeData";
import Link from "next/link";

export default function HomePage() {
  const { activities, home, posts, testimonies, loading, error } = useHomeData();

  if (loading) return <div className="min-h-screen flex items-center justify-center">Cargando...</div>;
  if (error) return <p className="text-center py-20 text-red-500">{error}</p>;
  if (!home) return null;

  return (
    <div className="flex flex-col gap-24 pb-24">
     
      <Hero />

      
      <HomeC titulo={home?.Title} presentacion={home?.Presentacion} />

      
      <Events events={activities} />
      <PostsSummary text={"Ver todas las Actividades"} href={"/Activities"}/>
    
      <section className="flex flex-col gap-8">
        <BlogPosts posts={posts} />
         <PostsSummary text={"Ver todos los Posts"} href={"/Posts"}/>
      </section>

    
      
        <Testimonies testimonies={testimonies} />
        <PostsSummary text={"Ver Todos los testimonios"} href={"/AllTestimonies"} />
      

     
      <div className="container mx-auto px-4 flex flex-col gap-12">
        
       

       
        <CallToAction />
      </div>
    </div>
  );
}