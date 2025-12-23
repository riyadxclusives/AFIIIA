import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How does AFIIIA track my cycle?",
    answer: "AFIIIA uses AI-powered algorithms to learn your unique patterns. Simply log your period start dates, and our system will predict future cycles, fertile windows, and phase transitions with increasing accuracy over time. The more you use it, the smarter it gets!",
  },
  {
    question: "Is my health data private and secure?",
    answer: "Absolutely. Your privacy is our top priority. All data is encrypted end-to-end, stored securely, and never shared with third parties. You have full control over your data and can export or delete it at any time.",
  },
  {
    question: "What makes the meal plans personalized to my cycle?",
    answer: "Each phase of your menstrual cycle has different nutritional needs. During menstruation, we suggest iron-rich foods. In the follicular phase, we focus on energy-boosting recipes. Ovulation calls for anti-inflammatory foods, and the luteal phase benefits from magnesium and complex carbs. Our AI adapts recipes based on your preferences and dietary restrictions too.",
  },
  {
    question: "Can I use AFIIIA if I have irregular periods?",
    answer: "Yes! AFIIIA is designed to work with all cycle types, including irregular ones. Our AI learns your unique patterns over time and adjusts predictions accordingly. You can also manually log symptoms and phases if your cycle varies significantly.",
  },
  {
    question: "What are Buddy Challenges?",
    answer: "Buddy Challenges let you invite friends or family to join wellness challenges together. Whether it is a hydration goal, workout streak, or mood journaling challenge, you can stay accountable and motivated while supporting each other on your wellness journeys.",
  },
  {
    question: "Is there a free trial available?",
    answer: "Yes! We offer a 14-day free trial for all new users. You get full access to all features during the trial period, no credit card required. After the trial, you can choose the plan that best fits your needs.",
  },
  {
    question: "Can I use AFIIIA during pregnancy?",
    answer: "Absolutely! AFIIIA has a dedicated pregnancy mode that adapts all features to support your journey. Track your trimesters, get pregnancy-safe meal suggestions, modified workout recommendations, and mood insights tailored to the unique experience of pregnancy.",
  },
  {
    question: "How do the AI insights work?",
    answer: "Our AI analyzes patterns in your logged data including mood, symptoms, sleep, activity, and cycle phase to provide personalized insights. It might notice that you tend to feel more energetic during your follicular phase or that certain symptoms correlate with specific cycle days, helping you understand and work with your body better.",
  },
];

const FAQSection = () => {
  return (
    <section id="faq" className="py-16 sm:py-20 md:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-12 md:mb-16">
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold mb-4 sm:mb-6">
            Frequently Asked
            <span className="text-gradient block">Questions</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground px-2">
            Everything you need to know about AFIIIA and how it can support your wellness journey.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full space-y-3 sm:space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border border-border/50 rounded-xl sm:rounded-2xl px-4 sm:px-6 bg-card/50 backdrop-blur-sm data-[state=open]:border-coral/30 transition-colors"
              >
                <AccordionTrigger className="text-left text-sm sm:text-base font-medium hover:no-underline py-4 sm:py-5 [&[data-state=open]>svg]:text-coral">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-xs sm:text-sm leading-relaxed pb-4 sm:pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Contact CTA */}
        <div className="text-center mt-10 sm:mt-12">
          <p className="text-muted-foreground text-sm sm:text-base">
            Still have questions?{" "}
            <a 
              href="/contact" 
              className="text-coral hover:text-coral/80 font-medium transition-colors underline-offset-4 hover:underline"
            >
              Contact our support team
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
