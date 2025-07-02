'use client';

import Image from "next/image"
import Link from "next/link"
import React from "react"
import Autoplay from "embla-carousel-autoplay"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Logo } from "@/components/icons"


export default function LoginPage() {
    const plugin = React.useRef(
      Autoplay({ delay: 5000, stopOnInteraction: false })
    )
    const [activeTab, setActiveTab] = React.useState("login")

    return (
        <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2">
            <div className="hidden bg-muted lg:block relative">
                 <Carousel 
                    className="w-full h-full" 
                    plugins={[plugin.current]}
                    opts={{ loop: true }}
                 >
                    <CarouselContent className="h-full">
                        <CarouselItem>
                            <Image src="/images/tarot/login_1.png" alt="Promo 1" width={1200} height={1800} className="h-full w-full object-cover" data-ai-hint="mystical tarot reading" />
                        </CarouselItem>
                        <CarouselItem>
                           <Image src="/images/tarot/login_2.png" alt="Promo 2" width={1200} height={1800} className="h-full w-full object-cover" data-ai-hint="astrology chart" />
                        </CarouselItem>
                        <CarouselItem>
                           <Image src="/images/tarot/login_3.png" alt="Promo 3" width={1200} height={1800} className="h-full w-full object-cover" data-ai-hint="crystal ball future" />
                        </CarouselItem>
                    </CarouselContent>
                </Carousel>
                <div className="absolute inset-0 bg-black/50" />
                <div className="absolute bottom-10 left-10 z-10 text-white max-w-md">
                    <h2 className="text-4xl font-bold font-headline">Unlock Your Destiny</h2>
                    <p className="mt-2 text-lg">Join our community to receive personalized tarot readings and spiritual guidance.</p>
                </div>
            </div>
            <div className="flex items-center justify-center py-12">
                <div className="mx-auto grid w-[350px] gap-6">
                    <div className="grid gap-2 text-center">
                        <Link href="/" className="flex flex-col justify-center items-center gap-4 mb-4">
                            <Logo className="w-[150px] h-auto" />
                            <h1 className="text-3xl font-bold font-headline">Mystic Agenda</h1>
                        </Link>
                    </div>
                    <Tabs defaultValue="login" className="w-full" value={activeTab} onValueChange={setActiveTab}>
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="login">Login</TabsTrigger>
                            <TabsTrigger value="register">Sign Up</TabsTrigger>
                        </TabsList>
                        <TabsContent value="login">
                            <Card className="border-none shadow-none">
                                <CardHeader>
                                    <CardTitle className="text-2xl">Welcome Back!</CardTitle>
                                    <CardDescription>
                                        Enter your credentials to access your account.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="grid gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="m@example.com"
                                            required
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <div className="flex items-center">
                                            <Label htmlFor="password">Password</Label>
                                            <Link
                                                href="#"
                                                className="ml-auto inline-block text-sm underline"
                                            >
                                                Forgot your password?
                                            </Link>
                                        </div>
                                        <Input id="password" type="password" required />
                                    </div>
                                    <Button type="submit" className="w-full">
                                        Login
                                    </Button>
                                </CardContent>
                                <CardFooter className="flex-col gap-4">
                                     <p className="text-sm text-muted-foreground">Don't have an account? <Button variant="link" className="p-0" onClick={() => setActiveTab("register")}>Sign up</Button></p>
                                </CardFooter>
                            </Card>
                        </TabsContent>
                        <TabsContent value="register">
                            <Card className="border-none shadow-none">
                                <CardHeader>
                                    <CardTitle className="text-2xl">Create an Account</CardTitle>
                                    <CardDescription>
                                        It's quick and easy. Get started in seconds.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="grid gap-4">
                                     <div className="grid gap-2">
                                        <Label htmlFor="name">Full Name</Label>
                                        <Input id="name" placeholder="Aria Montgomery" required />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="reg-email">Email</Label>
                                        <Input
                                            id="reg-email"
                                            type="email"
                                            placeholder="m@example.com"
                                            required
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="reg-password">Password</Label>
                                        <Input id="reg-password" type="password" required />
                                    </div>
                                    <Button type="submit" className="w-full">
                                        Create Account
                                    </Button>
                                </CardContent>
                                <CardFooter>
                                     <p className="text-sm text-muted-foreground">Already have an account? <Button variant="link" className="p-0" onClick={() => setActiveTab("login")}>Login</Button></p>
                                </CardFooter>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    );
}
