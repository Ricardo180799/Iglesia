import { Section } from "../../../../UI/Sections";
export default function HomeC({titulo,presentacion}){
    return(
        <Section className={"text-2xl"} title={titulo} subtitle="Quiénes somos">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-neutral-600 text-lg leading-relaxed">
            {presentacion}
          </p>
        </div>
      </Section>
    )
}