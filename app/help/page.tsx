import { HelpCenter } from "@/components/help/help-center"
import { FAQ } from "@/components/help/faq"
import { SupportTickets } from "@/components/help/support-tickets"
import { LiveChat } from "@/components/help/live-chat"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function HelpPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Help Center</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Find answers to your questions and get the support you need
        </p>
      </div>

      <Tabs defaultValue="faq" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="faq">FAQ</TabsTrigger>
          <TabsTrigger value="tickets">Support Tickets</TabsTrigger>
          <TabsTrigger value="chat">Live Chat</TabsTrigger>
          <TabsTrigger value="guides">Guides</TabsTrigger>
        </TabsList>

        <TabsContent value="faq" className="mt-8">
          <FAQ />
        </TabsContent>

        <TabsContent value="tickets" className="mt-8">
          <SupportTickets />
        </TabsContent>

        <TabsContent value="chat" className="mt-8">
          <LiveChat />
        </TabsContent>

        <TabsContent value="guides" className="mt-8">
          <HelpCenter />
        </TabsContent>
      </Tabs>
    </div>
  )
}
