import { Award, Gamepad2, Globe, Users } from "lucide-react";
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
export default function About() {
  return (
    <div className="min-h-screen max-w-[calc(1200px+40px)] px-5 pt-[165px]">
      <section className="relative ml-14 w-full border-0 p-0 after:absolute after:right-1/2 after:top-0 after:z-[-2] after:h-full after:w-screen after:translate-x-1/2 after:bg-[#9282b5] after:bg-cover after:bg-top after:bg-no-repeat">
        <div className="relative">
          <div className="relative -mt-5 mb-[100px] flex flex-col pb-[100px] pl-0 pr-0 pt-[100px]">
            <div className="max-w-[600px]">
              <h2 className="mb-7 text-[1.6rem] font-extrabold uppercase leading-8 tracking-[1.4px]">
                SOBRE GAME VAULT
              </h2>
              <h1 className="mb-7 block text-[calc(2.24rem+2.1333vw)] font-bold leading-[5rem] tracking-[-0.03em]">
                Tu fuente definitiva de entretenimiento digital
              </h1>
              <p className="mb-7 max-w-[380px] text-[1.6rem] font-normal leading-[2.4rem] text-[#dcd8e6]">
                Descubrammos juntos el placer de jugar! Ya sea en PC, consolas o
                dispositivos móviles, te respaldamos con los mejores productos a
                precios asequibles.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <Gamepad2 className="mb-2 h-10 w-10 text-primary" />
            <CardTitle>Games</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Disfruta de tus juegos con ofertas asequibles en mas de 10,000
              juegos disponibles.
            </CardDescription>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <Users className="mb-2 h-10 w-10 text-primary" />
            <CardTitle>Comunidad Activa</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Únete a millones de jugadores en nuestra comunidad global.
            </CardDescription>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <Globe className="mb-2 h-10 w-10 text-primary" />
            <CardTitle>Entrega Global</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Entrega instantánea de códigos de juego a cualquier parte del
              mundo.
            </CardDescription>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <Award className="mb-2 h-10 w-10 text-primary" />
            <CardTitle>Garantía de Calidad</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Todos nuestros productos son 100% originales y garantizados.
            </CardDescription>
          </CardContent>
        </Card>
      </section>
      <section className="mb-12 grid gap-8 md:grid-cols-2">
        <div className="flex flex-col justify-center">
          <h2 className="mb-4 text-3xl font-bold">QUIENES SOMOS</h2>
          <p className="text-lg text-muted-foreground">
            En Game Vault, somos apasionados por los videojuegos y la
            tecnología. Nuestra misión es proporcionar a los jugadores de todo
            el mundo acceso fácil y rápido a los mejores títulos del mercado.
            Con años de experiencia en la industria, nuestro equipo está
            comprometido a ofrecer un servicio excepcional y una experiencia de
            compra sin igual.
          </p>
          <p className="mt-4 text-lg text-muted-foreground">
            Nos enorgullece ser más que una simple tienda en línea; somos una
            comunidad de jugadores que comparten la misma pasión. Nuestro
            conocimiento profundo del mundo de los videojuegos nos permite
            ofrecer recomendaciones personalizadas y mantenernos a la vanguardia
            de las últimas tendencias y lanzamientos.
          </p>
        </div>
        <div className="relative h-[300px] w-[300px] overflow-hidden rounded-full">
          <Image
            src="https://beehrblog.com/wp-content/uploads/2024/03/teamwork-training-and-human-resources-with-a-busi-2023-11-27-04-50-40-utc-1280x897.jpg"
            alt="Equipo de GameStore"
            layout="fill"
            objectFit="cover"
            className="rounded-full"
          />
        </div>
      </section>
      <section>
        <h2 className="mb-7 block text-2xl font-normal leading-[5rem] tracking-[-0.03em]">
          Preguntas frecuentes
        </h2>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>
              Puedo crear una pagina de aficionados sobre un juego de ustedes?
            </AccordionTrigger>
            <AccordionContent>
              ¡Nos encantaría! Lo único que pedimos es que se siga nuestra
              Politica de contenido de aficionados.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>
              ¿Puede Game Vault patrocinar a mi equipo en un próximo torneo?
            </AccordionTrigger>
            <AccordionContent>
              En este momento no ofrecemos patrocinios para competiciones de
              juegos ni torneos.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>
              ¿Puedo monetizar vídeos de juego que he creado en los que se
              incluyen juegos de ustedes?
            </AccordionTrigger>
            <AccordionContent>Sí, está permitido.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>
              Tengo una idea muy buena para un juego o para Epic. ¿Podemos
              hablar sobre ella?
            </AccordionTrigger>
            <AccordionContent>
              No podemos aceptar propuestas externas de ningún tipo. No nos
              envíes ideas, historias, arte, niveles de juego, música, etc. Por
              motivos legales, no podemos revisarlos.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5">
            <AccordionTrigger>¿Podría visitar el estudio?</AccordionTrigger>
            <AccordionContent>
              Como política general, no ofrecemos visitas al estudio. Nos
              comprometemos a ofrecer a nuestro equipo el entorno de trabajo más
              propicio para que pueda concentrarse y seguir creando grandes
              juegos y tecnología.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>
    </div>
  );
}
