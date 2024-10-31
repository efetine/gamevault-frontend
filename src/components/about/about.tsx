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
    <div className="min-h-screen bg-gradient-to-b from-[#0d1117] via-[#1a2332] to-black text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <section className="relative overflow-hidden pt-5">
          <div className="absolute inset-0 z-0">
            <div className="h-[700px] w-full">
              <Image
                src="https://img.freepik.com/fotos-premium/dos-controladores-videojuegos-muestran-palabras-alegria-parte-inferior_657790-20696.jpg"
                alt="Background"
                layout="fill"
                objectFit="cover"
              />
              <div
                className="absolute inset-0 bg-blue-600 bg-opacity-50"
                aria-hidden="true"
              ></div>
            </div>
          </div>
          <div className="container relative mx-auto px-4 pb-24 pt-40">
            <div className="max-w-2xl">
              <h2 className="mb-6 text-xl font-extrabold uppercase leading-8 tracking-wider">
                SOBRE GAME VAULT
              </h2>
              <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl">
                Tu fuente definitiva de entretenimiento digital
              </h1>
              <p className="mb-8 max-w-lg text-lg font-normal leading-relaxed text-gray-300 md:text-xl">
                Descubramos juntos el placer de jugar! Ya sea en PC, consolas o
                dispositivos móviles, te respaldamos con los mejores productos a
                precios asequibles.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12 grid gap-6 pt-9 md:grid-cols-2 lg:grid-cols-4">
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
        <section className="mb-12 flex flex-col items-center justify-between gap-8 md:flex-row">
          <div className="flex max-w-xl flex-col justify-center">
            <h2 className="mb-4 text-3xl font-bold">QUIENES SOMOS</h2>
            <p className="text-lg text-muted-foreground">
              En Game Vault, somos apasionados por los videojuegos y la
              tecnología. Nuestra misión es proporcionar a los jugadores de todo
              el mundo acceso fácil y rápido a los mejores títulos del mercado.
              Con años de experiencia en la industria, nuestro equipo está
              comprometido a ofrecer un servicio excepcional y una experiencia
              de compra sin igual.
            </p>
            <p className="mt-4 text-lg text-muted-foreground">
              Nos enorgullece ser más que una simple tienda en línea; somos una
              comunidad de jugadores que comparten la misma pasión. Nuestro
              conocimiento profundo del mundo de los videojuegos nos permite
              ofrecer recomendaciones personalizadas y mantenernos a la
              vanguardia de las últimas tendencias y lanzamientos.
            </p>
          </div>
          <div className="relative h-[300px] w-full max-w-[300px] overflow-hidden">
            <div className="absolute inset-0 overflow-hidden rounded-bl-[40%] rounded-br-3xl rounded-tl-3xl rounded-tr-[40%] bg-black">
              <Image
                src="https://cdn.bb.com.br/wp-content/uploads/2024/06/Imagem_Destacada_Cheque_Ouro_Empresarial.jpeg"
                alt="Equipo de GameStore"
                layout="fill"
                objectFit="cover"
                className="rounded-md"
              />
            </div>
          </div>
        </section>
        <section>
          <h2 className="mb-7 block text-2xl font-normal leading-[5rem] tracking-[-0.03em]">
            Preguntas frecuentes
          </h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-sky-600">
                Puedo crear una pagina de aficionados sobre un juego de ustedes?
              </AccordionTrigger>
              <AccordionContent>
                ¡Nos encantaría! Lo único que pedimos es que se siga nuestra
                Politica de contenido de aficionados.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-sky-600">
                ¿Puede Game Vault patrocinar a mi equipo en un próximo torneo?
              </AccordionTrigger>
              <AccordionContent>
                En este momento no ofrecemos patrocinios para competiciones de
                juegos ni torneos.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-sky-600">
                ¿Puedo monetizar vídeos de juego que he creado en los que se
                incluyen juegos de ustedes?
              </AccordionTrigger>
              <AccordionContent>Sí, está permitido.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger className="text-sky-600">
                Tengo una idea muy buena para un juego o para Epic. ¿Podemos
                hablar sobre ella?
              </AccordionTrigger>
              <AccordionContent>
                No podemos aceptar propuestas externas de ningún tipo. No nos
                envíes ideas, historias, arte, niveles de juego, música, etc.
                Por motivos legales, no podemos revisarlos.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger className="text-sky-600">
                ¿Podría visitar el estudio?
              </AccordionTrigger>
              <AccordionContent>
                Como política general, no ofrecemos visitas al estudio. Nos
                comprometemos a ofrecer a nuestro equipo el entorno de trabajo
                más propicio para que pueda concentrarse y seguir creando
                grandes juegos y tecnología.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>
      </div>
    </div>
  );
}
