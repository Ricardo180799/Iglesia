import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";
import { formatDate } from "../../../../Utils/Formatdate";
import { Card } from "../../../../UI/Card";
import { CardContent } from "../../../../UI/CardContainer";

export default function TestimonyDetail() {
  const router = useRouter();
  const { id } = router.query; // obtenemos el ID del testimonio
  const [testimony, setTestimony] = useState(null);

  useEffect(() => {
    if (!id) return;

    // Aquí deberías reemplazar con tu método real de fetch o API
    fetch(`/api/testimonies/${id}`)
      .then((res) => res.json())
      .then((data) => setTestimony(data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!testimony) {
    return <p className="text-center mt-20">Cargando testimonio...</p>;
  }

  return (
    <section className="my-20 px-4 max-w-3xl mx-auto">
      <Card className="bg-white">
        <CardContent className="flex flex-col gap-6 p-8">
          
          {/* Título */}
          <h1 className="text-3xl font-bold text-neutral-900">
            {testimony.Title}
          </h1>

          {/* Autor y Fecha */}
          <div className="text-sm text-neutral-500">
            {testimony.Author && <span>Autor: {testimony.Author}</span>}
            {testimony.Created_At && (
              <span className="block">
                Publicado: {formatDate ? formatDate(testimony.Created_At) : testimony.Created_At}
              </span>
            )}
          </div>

          {/* Imagen (si tiene) */}
          {testimony.Thumbnail && (
            <div className="relative w-full h-64 rounded-xl overflow-hidden">
              <Image
                src={testimony.Thumbnail}
                alt={testimony.Title}
                fill
                className="object-cover"
              />
            </div>
          )}

          {/* Contenido completo */}
          {testimony.Content && (
            <p className="text-neutral-700 text-md leading-relaxed whitespace-pre-line">
              {testimony.Content}
            </p>
          )}

          {/* Video (si es tipo video) */}
          {testimony.Type === "Video" && testimony.Video_Url && (
            <video
              src={testimony.Video_Url}
              controls
              className="rounded-xl w-full mt-4"
            />
          )}
        </CardContent>
      </Card>
    </section>
  );
}