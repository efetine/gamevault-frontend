import {
  Edit,
  Facebook,
  Github,
  Instagram,
  MessageSquare,
  Settings,
  ShoppingBag,
  Star,
  Twitter,
  Users,
} from "lucide-react";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { Textarea } from "~/components/ui/textarea";

export default function Component() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0d1117] via-[#1a2332] to-black text-white">
      <div className="flex flex-col lg:flex-row">
        {/* Main Content */}
        <div className="flex-grow p-8">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Header */}
            <div className="relative">
              <img
                src="https://steamcdn-a.akamaihd.net/steamcommunity/public/images/steamworks_docs/spanish/Header_1.jpg"
                alt="Profile Banner"
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black to-transparent">
                <div className="flex items-center space-x-4">
                  <img
                    src="https://i.pinimg.com/enabled_hi/564x/a8/41/35/a841355d2cebb5296609ef84a2dc7990.jpg"
                    alt="Profile Picture"
                    className="rounded-full border-4 border-blue-500 h-32 w-32"
                  />
                  <div>
                    <h1 className="text-3xl font-bold">XxDragonSlayer99xX</h1>
                    <div className="flex items-center space-x-2">
                      <Badge
                        variant="secondary"
                        className="bg-[#4c6b22] text-white"
                      >
                        Level 42
                      </Badge>
                      <span className="text-white">Online</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* User Description */}
            <Card className="bg-[#1a2634] border-[#0e1621]">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-2xl font-bold">About Me</h2>
                  <Button variant="ghost" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
                <Textarea
                  className="bg-[#1a2634] border-[#0e1621] text-white"
                  placeholder="Add a description about yourself..."
                  defaultValue="Hardcore gamer since 2005. I live and breathe RPGs and FPS games. Always up for a challenge and making new gaming buddies!"
                />
              </CardContent>
            </Card>

            {/* Games Owned */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Games Owned</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((game) => (
                  <Card key={game} className="bg-[#1a2634] border-[#0e1621]">
                    <CardContent className="p-4">
                      <img
                        src={`/placeholder.svg?height=150&width=150&text=Game ${game}`}
                        alt={`Game ${game}`}
                        className="w-full h-auto rounded mb-2"
                      />
                      <div className="font-semibold">Game {game}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Social Media Links */}
            <Card className="bg-[#1a2634] border-[#0e1621]">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4">Linked Accounts</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button
                    variant="outline"
                    className="flex items-center space-x-2"
                  >
                    <Twitter className="h-4 w-4" />
                    <span>Twitter</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="flex items-center space-x-2"
                  >
                    <Facebook className="h-4 w-4" />
                    <span>Facebook</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="flex items-center space-x-2"
                  >
                    <Instagram className="h-4 w-4" />
                    <span>Instagram</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="flex items-center space-x-2"
                  >
                    <Github className="h-4 w-4" />
                    <span>GitHub</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <Button className="flex-1 bg-[#4c6b22] hover:bg-[#3b5319] text-white">
                <MessageSquare className="mr-2 h-4 w-4" /> Send Message
              </Button>
              <Button className="flex-1 bg-[#4c6b22] hover:bg-[#3b5319] text-white">
                <Users className="mr-2 h-4 w-4" /> Add Friend
              </Button>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:w-48 bg-[#1a2634] p-4 lg:p-6 space-y-6">
          <div className="flex flex-col space-y-2">
            <Button variant="ghost" className="justify-start">
              <Star className="mr-2 h-4 w-4" /> Wishlist
            </Button>
            <Button variant="ghost" className="justify-start">
              <ShoppingBag className="mr-2 h-4 w-4" /> Library
            </Button>
            <Button variant="ghost" className="justify-start">
              <Settings className="mr-2 h-4 w-4" /> Edit Profile
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
