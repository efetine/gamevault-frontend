// export default function Support() {
//   return <div>support</div>;
// }
import { Headphones, Mail, MessageSquare } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { Button } from "~/components/ui/button";

export default function Support() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0d1117] via-[#1a2332] to-black text-white">
      {/* Banner */}
      <div className="px-4 py-8 text-white sm:px-6 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          {/* Frequently Asked Questions */}
          <h2 className="mb-6 text-center text-2xl font-bold dark:text-white sm:text-left sm:text-3xl">
            Frequently Asked Questions
          </h2>
          <Accordion type="single" collapsible className="mb-12">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-lg text-sky-600">
                Can I create a fan page about one of your games?
              </AccordionTrigger>
              <AccordionContent className="text-base">
                We would love that! The only thing we ask is that you follow our
                Fan Content Policy.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-lg text-sky-600">
                Can Game Vault sponsor my team in an upcoming tournament?
              </AccordionTrigger>
              <AccordionContent className="text-base">
                At this time, we do not offer sponsorships for game competitions
                or tournaments.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-lg text-sky-600">
                Can I monetize gameplay videos that I have created that include
                your games?
              </AccordionTrigger>
              <AccordionContent className="text-base">
                Yes, that is allowed.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger className="text-lg text-sky-600">
                I have a really good idea for a game. Can we talk about it?
              </AccordionTrigger>
              <AccordionContent className="text-base">
                We cannot accept outside proposals of any kind. Please do not
                send us ideas, stories, art, game levels, music, etc. For legal
                reasons, we cannot review them.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger className="text-lg text-sky-600">
                Could I visit the studio?
              </AccordionTrigger>
              <AccordionContent className="text-base">
                As a general policy, we do not offer studio visits. We are
                committed to providing our team with the most conducive work
                environment so they can focus and continue creating great games
                and technology.
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* Other support options */}
          <h2 className="mb-6 text-center text-2xl font-bold dark:text-white sm:text-left sm:text-3xl">
            Other ways to get help
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
              <Headphones className="mx-auto mb-4 h-12 w-12 text-purple-600 sm:mx-0" />
              <h3 className="mb-2 text-center text-xl font-semibold text-black dark:text-white sm:text-left">
                Phone Support
              </h3>
              <p className="mb-4 text-center text-gray-600 dark:text-gray-300 sm:text-left">
                Speak directly with one of our support agents.
              </p>
              <div className="w-full rounded-md border border-gray-200 p-4 text-center text-black hover:bg-gray-200 dark:border-white dark:bg-black dark:text-white dark:hover:bg-gray-700 sm:w-auto">
                <h1>Call Now</h1>
                <p>+51 934907866</p>
              </div>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
              <MessageSquare className="mx-auto mb-4 h-12 w-12 text-blue-600 sm:mx-0" />
              <h3 className="mb-2 text-center text-xl font-semibold text-black dark:text-white sm:text-left">
                Live Chat
              </h3>
              <p className="mb-4 text-center text-gray-600 dark:text-gray-300 sm:text-left">
                Chat in real-time with our support team.
              </p>
              <Button
                variant="outline"
                className="w-full border-gray-200 text-black hover:bg-gray-200 dark:border-white dark:text-white dark:hover:bg-gray-700 sm:w-auto"
              >
                Start Chat
              </Button>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
              <Mail className="mx-auto mb-4 h-12 w-12 text-green-600 sm:mx-0" />
              <h3 className="mb-2 text-center text-xl font-semibold text-black dark:text-white sm:text-left">
                Email
              </h3>
              <p className="mb-4 text-center text-gray-600 dark:text-gray-300 sm:text-left">
                Send us an email and we'll respond within 24 hours.
              </p>
              <Button
                variant="outline"
                className="w-full border-gray-200 text-black hover:bg-gray-200 dark:border-white dark:text-white dark:hover:bg-gray-700 sm:w-auto"
              >
                Send Email
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
