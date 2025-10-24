import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Image from 'next/image';

export default function AboutPage() {
  const aboutMeImage = {
    imageUrl:
      'https://images.unsplash.com/photo-1549833971-c4283bad0032?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxtaW5pbWFsaXN0JTIwd29ya3NwYWNlfGVufDB8fHx8MTc2MTIxODYyOHww&ixlib-rb-4.1.0&q=80&w=1080',
    description: 'A minimalist workspace',
    imageHint: 'minimalist workspace',
  };

  return (
    <div className="container max-w-4xl py-12 md:py-16 lg:py-20">
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <Avatar className="h-32 w-32">
            <AvatarImage src={aboutMeImage.imageUrl} alt="Thio Saputra" />
            <AvatarFallback>TS</AvatarFallback>
          </Avatar>
          <div className="text-center md:text-left">
            <h1 className="font-headline text-3xl font-bold tracking-tighter md:text-5xl">
              About Me
            </h1>
            <p className="mt-2 text-lg text-muted-foreground">
              Developer, Designer, and Lifelong Learner.
            </p>
          </div>
        </div>
        
        <div className="prose dark:prose-invert max-w-none text-lg">
          <p>
            Hello! I'm Thio Saputra, a passionate and detail-oriented developer based in [Your City]. My journey into the world of technology began with a simple curiosity for how things work, which quickly evolved into a full-fledged passion for creating beautiful, functional, and user-centric digital experiences.
          </p>

          <p>
            My motto is **"Amati, Tiru, Modifikasi" (Observe, Copy, Modify)**. I believe that the best way to learn and innovate is by standing on the shoulders of giants. I constantly explore existing solutions, understand their core principles, and then adapt and improve upon them to create something new and better. This approach has allowed me to grow rapidly and tackle a wide range of challenges with confidence.
          </p>
          
          <h2 className="font-headline text-2xl font-bold mt-12">My Philosophy</h2>
          <p>
            I believe that good design is invisible. The best user experiences are the ones that feel so natural and intuitive that you don't even notice them. My goal is to write clean, efficient code that translates into seamless interactions on the screen. I'm driven by the challenge of solving complex problems and the satisfaction of seeing a project come to life, from the initial idea to the final polished product.
          </p>

          <h2 className="font-headline text-2xl font-bold mt-12">Beyond the Code</h2>
          <p>
            When I'm not in front of a computer screen, I enjoy [Your Hobby 1, e.g., exploring nature, photography, reading sci-fi novels]. These activities help me stay balanced, find new perspectives, and recharge my creativity. I'm always open to new challenges and collaborations, so feel free to reach out!
          </p>
        </div>
      </div>
    </div>
  );
}
