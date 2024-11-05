'use client';

// export default function Support() {
//   return <div>support</div>;
// }
import { Headphones, Mail, MessageSquare } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '~/components/ui/accordion';
import { Button } from '~/components/ui/button';

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
                Do you offer refunds if I am not satisfied with a game?
              </AccordionTrigger>
              <AccordionContent className="text-base">
                Yes, we have a refund policy that applies under certain
                conditions. Please check our Terms and Conditions for more
                information.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-lg text-sky-600">
                Can I transfer the games I purchase to another account?
              </AccordionTrigger>
              <AccordionContent className="text-base">
                No, game licenses are non-transferable and are linked to the
                account used for purchase.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-lg text-sky-600">
                Is support available if I experience technical issues with a
                game?
              </AccordionTrigger>
              <AccordionContent className="text-base">
                Yes, you can contact our support team or visit each game's help
                section for common solutions.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger className="text-lg text-sky-600">
                Do you offer discounts or promotions on certain games?
              </AccordionTrigger>
              <AccordionContent className="text-base">
                Yes, we run special offers and promotions on select dates. Check
                our homepage and follow us on social media to stay updated on
                our promotions.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger className="text-lg text-sky-600">
                What kind of warranty do physical products, like keyboards and
                graphics cards, come with?
              </AccordionTrigger>
              <AccordionContent className="text-base">
                All our physical products come with at least a one-year
                warranty. Check each product’s details for specific warranty
                coverage information.
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

              <Button>
                <a href="tel:+529841400513">Call us</a>
              </Button>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
              <MessageSquare className="mx-auto mb-4 h-12 w-12 text-blue-600 sm:mx-0" />
              <h3 className="mb-2 text-center text-xl font-semibold text-black dark:text-white sm:text-left">
                Live Chat
              </h3>
              <p className="mb-4 text-center text-gray-600 dark:text-gray-300 sm:text-left">
                Chat in real-time with our support team.
              </p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
              <Mail className="mx-auto mb-4 h-12 w-12 text-green-600 sm:mx-0" />
              <h3 className="mb-2 text-center text-xl font-semibold text-black dark:text-white sm:text-left">
                Email
              </h3>
              <p className="mb-4 text-center text-gray-600 dark:text-gray-300 sm:text-left">
                Send us an email and we'll respond within 24 hours.
              </p>
              <Button>
                <a href="mailto:thenewkings3.0@gmail.com">Contact us</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
