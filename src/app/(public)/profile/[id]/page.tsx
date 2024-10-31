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
import { getServerAuthSession } from "~/server/auth";

export async function Profile() {
  const session = await getServerAuthSession();

  return (
    <div className="flex min-h-screen text-white">
      {/* Sidebar */}
      <div className="w-48 space-y-6 bg-[#1a2634] p-6">
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

      {/* Main Content */}
      <div className="flex-grow p-8">
        <div className="mx-auto max-w-4xl space-y-8">
          {/* Header */}
          <div className="relative">
            <img
              src="https://steamcdn-a.akamaihd.net/steamcommunity/public/images/steamworks_docs/spanish/Header_1.jpg"
              alt="Profile Banner"
              className="h-48 w-full rounded-t-lg object-cover"
            />
            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent p-4">
              <div className="flex items-center space-x-4">
                <img
                  src="https://i.pinimg.com/enabled_hi/564x/a8/41/35/a841355d2cebb5296609ef84a2dc7990.jpg"
                  alt="Profile Picture"
                  className="h-32 w-32 rounded-full border-4 border-blue-500"
                />
                <div>
                  <h1 className="text-3xl font-bold">{session?.user.name}</h1>
                  <div className="flex items-center space-x-2">
                    <Badge
                      variant="secondary"
                      className="bg-[#4c6b22] text-white"
                    >
                      No level ( NO API )
                    </Badge>
                    <span className="text-white">Online ( NO API )</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* User Description */}
          <Card className="border-[#0e1621] bg-[#1a2634]">
            <CardContent className="p-6">
              <div className="mb-4 flex items-start justify-between">
                <h2 className="text-2xl font-bold">About Me</h2>
                <Button variant="ghost" size="icon">
                  <Edit className="h-4 w-4" />
                </Button>
              </div>
              <Textarea
                className="border-[#0e1621] bg-[#1a2634] text-white"
                placeholder="Add a description about yourself..."
                defaultValue="( NO API )"
              />
            </CardContent>
          </Card>

          {/* Games Owned */}
          <div>
            <h2 className="mb-4 text-2xl font-bold">Games Owned</h2>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((game) => (
                <Card key={game} className="border-[#0e1621] bg-[#1a2634]">
                  <CardContent className="p-4">
                    {/* <img
                      src={`https://sm.ign.com/t/ign_es/cover/s/silent-hil/silent-hill-2-remake_ktez.300.jpg`}
                      alt={`Game ${game}`}
                      className="mb-2 h-auto w-full rounded"
                    />
                    <div className="font-semibold">Game {game}</div> */}
                    ( NO API )
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Social Media Links */}
          <Card className="border-[#0e1621] bg-[#1a2634]">
            <CardContent className="p-6">
              <h2 className="mb-4 text-2xl font-bold">Linked Accounts</h2>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
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
            <Button className="flex-1 bg-[#4c6b22] text-white hover:bg-[#3b5319]">
              <MessageSquare className="mr-2 h-4 w-4" /> Send Message
            </Button>
            <Button className="flex-1 bg-[#4c6b22] text-white hover:bg-[#3b5319]">
              <Users className="mr-2 h-4 w-4" /> Add Friend
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
