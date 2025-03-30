
import { Explanation, ExplanationMode, PersonaMode, TikTokContent, MemeContent, TikTokStyle } from "../types/explanation";

// This is a mock service that will be replaced with real API calls later
export const generateExplanation = async (
  topic: string,
  mode: ExplanationMode,
  persona: PersonaMode
): Promise<Explanation> => {
  // Simulate network request
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  let text = '';
  
  // Generate different mock responses based on mode
  switch (mode) {
    case 'eli5':
      text = getEli5Response(topic, persona);
      break;
    case 'eli12':
      text = getEli12Response(topic, persona);
      break;
    case 'eli20':
      text = getEli20Response(topic, persona);
      break;
    case 'shower':
      text = getShowerThoughtResponse(topic, persona);
      break;
    default:
      text = getEli5Response(topic, persona);
  }
  
  // Generate TikTok content
  const tikTokContent = generateTikTokContent(topic, mode, persona);
  
  // Generate meme content
  const memeContent = generateMemeContent(topic, mode, persona);
  
  return {
    text,
    mode,
    persona,
    topic,
    tikTokContent,
    memeContent
  };
};

// Generate TikTok style content with enhanced viral potential
const generateTikTokContent = (topic: string, mode: ExplanationMode, persona: PersonaMode): TikTokContent => {
  const styles: TikTokStyle[] = ['casual', 'dramatic', 'educational', 'hype'];
  const randomStyle = styles[Math.floor(Math.random() * styles.length)];
  
  let script = '';
  const hashtags = ['#learnontiktok', `#${topic.replace(/\s+/g, '')}`, '#explainofun', '#viral', '#fyp'];
  
  switch (persona) {
    case 'genz':
      script = `No cap, ${topic} is actually WILD! It's basically ${getShortExplanation(topic, mode)}. Like, that's literally so mind-blowing! *Points up dramatically* POV: you just learned something that will change your life. This is not a drill! Follow for more mind-blowing facts! ✌️`;
      hashtags.push('#mindblown', '#learnwithme', '#genz');
      break;
    case 'professor':
      script = `Today's lesson: ${topic}. *Adjusts glasses* The fascinating thing is that ${getShortExplanation(topic, mode)}. *Dramatic pause* But what they DON'T tell you in textbooks is... *leans in* this concept changes EVERYTHING we know. Remember this for your next conversation! Class dismissed! *Drops invisible mic*`;
      hashtags.push('#education', '#learnsomethingeveryday', '#professorlife');
      break;
    case 'geek':
      script = `So ${topic} is ACTUALLY mind-blowing from a technical perspective. *Types furiously* Essentially, ${getShortExplanation(topic, mode)}. *Pushes glasses up* And that's why this is literally the coolest thing ever! This knowledge literally lives in my head rent free. *Excited hand gestures* Isn't that just INCREDIBLY epic?`;
      hashtags.push('#scienceisawesome', '#geekfacts', '#nerdtok');
      break;
    case 'comedian':
      script = `So ${topic} walks into a bar... *Waits for laugh* But seriously folks, ${getShortExplanation(topic, mode)}. *Pretends to drop mic* Who knew learning could be this entertaining? Not my ex, that's for sure! *Winks at camera* If this doesn't get me viral, I'm going back to my day job!`;
      hashtags.push('#comedyeducation', '#funfacts', '#standuptok');
      break;
    default:
      script = `Let's talk about ${topic}! *Excited face* It's all about ${getShortExplanation(topic, mode)}. *Shows shocked face* Did your mind just explode? Because mine did! Make sure to follow for more amazing explanations that will literally change your perspective forever!`;
  }
  
  return {
    script,
    hashtags,
    style: randomStyle
  };
};

// Generate meme content with enhanced viral humor
const generateMemeContent = (topic: string, mode: ExplanationMode, persona: PersonaMode): MemeContent => {
  // In a real implementation, this would connect to an AI image generator
  // For now, we'll use placeholder content that matches our available meme templates
  
  let topText = '';
  let bottomText = '';
  
  switch (persona) {
    case 'genz':
      topText = `ME TRYING TO UNDERSTAND ${topic.toUpperCase()}`;
      bottomText = "MY BRAINCELLS: AIGHT IMMA HEAD OUT";
      break;
    case 'professor':
      topText = `PROFESSOR: ${topic.toUpperCase()} IS SIMPLE`;
      bottomText = "STUDENTS: *VISIBLE CONFUSION INTENSIFIES*";
      break;
    case 'geek':
      topText = `WHEN SOMEONE ASKS ME ABOUT ${topic.toUpperCase()}`;
      bottomText = "ME: I'VE BEEN WAITING MY WHOLE LIFE FOR THIS MOMENT";
      break;
    case 'comedian':
      topText = `EXPLAINING ${topic.toUpperCase()} NORMALLY: 0 VIEWS`;
      bottomText = `EXPLAINING ${topic.toUpperCase()} WITH RIDICULOUS JOKES: VIRAL SENSATION`;
      break;
    default:
      topText = `ME EXPLAINING ${topic.toUpperCase()} AT 3AM`;
      bottomText = "MY FBI AGENT: INTERESTING, TELL ME MORE";
  }
  
  // We're not using this imageUrl anymore since the MemeGenerator component will choose
  // an appropriate image based on the text, but we need to keep it in the type
  const imageUrl = "";
  
  return {
    imageUrl,
    topText,
    bottomText
  };
};

// Generate a very short explanation for TikTok with more viral potential
const getShortExplanation = (topic: string, mode: ExplanationMode): string => {
  const explanations: Record<string, Record<ExplanationMode, string>> = {
    "black holes": {
      "eli5": "super strong space vacuum cleaners that eat light for breakfast and spit out science fiction plots",
      "eli12": "collapsed stars with gravity so intense they're basically the universe's way of saying 'come closer, I dare you'",
      "eli20": "singularities that turn physics into abstract art and make Einstein roll in his grave",
      "shower": "cosmic trash compactors where the universe hides all its embarrassing throwaway dimensions"
    },
    "quantum physics": {
      "eli5": "tiny particles that play hide and seek with scientists and change the rules whenever someone's watching",
      "eli12": "the study of particles that are basically teenagers—impossible to predict, existing in multiple states, and disappearing when you need them",
      "eli20": "the scientific proof that reality is actually more of a suggestion than a rule",
      "shower": "reality's way of proving that even the universe doesn't know what it's doing half the time"
    },
    "default": {
      "eli5": "something so mind-blowing your brain will literally explode (but in a good, viral TikTok way)",
      "eli12": "a concept so interesting that even your crush will be impressed when you explain it to them",
      "eli20": "a phenomenon that makes scientists go 'this changes everything' and everyone else go 'wait, what?'",
      "shower": "something that makes you question reality while your shampoo bottle audience is completely mind-blown"
    }
  };
  
  // Try to get a specific explanation for the topic, fall back to default
  const topicExplanations = explanations[topic.toLowerCase()] || explanations["default"];
  return topicExplanations[mode];
};

// Mock responses with enhanced humor
function getEli5Response(topic: string, persona: PersonaMode): string {
  const responses: Record<PersonaMode, string> = {
    'professor': `Okay little one, imagine ${topic} is like a magical ice cream cone that never melts. When you lick this special ice cream, it gives you super brain powers! That's basically how ${topic} works in the simplest way! Just like how you can't explain why dinosaur-shaped chicken nuggets taste better than regular ones, some things in life are just magical like that.`,
    'geek': `So kiddo, ${topic} is basically like when you have the ultimate super rare legendary Pokémon card that nobody else at school has. The card has special powers that make all the other kids go "Woooow!" That's exactly what ${topic} does in the real world! It's like having cheat codes for reality, except nobody can send you to the principal's office for using them.`,
    'genz': `Ok so ${topic} is literally like when your TikTok goes viral for absolutely no reason! It's just *chef's kiss* perfectly chaotic. It's giving main character energy with side character development, for real for real. No cap, it's basically the GOAT of concepts. If ${topic} was a person, it would definitely pass the vibe check!`,
    'comedian': `Heyyy little buddy! Wanna know about ${topic}? It's like when you're trying to explain to your parents why you need a new toy when you have 37 identical ones at home! It's messy, confusing, and somehow makes perfect sense to you but nobody else! Just like that time your dad tried to assemble IKEA furniture after saying "I don't need the instructions" - it's a beautiful disaster that somehow works out in the end!`
  };
  
  return responses[persona];
}

function getEli12Response(topic: string, persona: PersonaMode): string {
  const responses: Record<PersonaMode, string> = {
    'professor': `Let's explore ${topic} at a middle-school level. Imagine ${topic} is like the most epic multiplayer video game ever created. Each player has specific abilities and limitations, and they all interact according to well-defined rules. When you understand these rules, you can predict what will happen next and develop winning strategies. That's essentially how ${topic} functions in our universe. Much like how your excuses for not doing homework somehow get more creative each week, yet I've heard them all before.`,
    'geek': `So here's the deal with ${topic}: it's exactly like the code behind your favorite open-world game. There are specific algorithms that determine how everything works, from NPC behavior to physics engines. When you understand those algorithms, you can predict glitches and exploit them for speedruns. ${topic} involves a similar set of rules that, once mastered, let you navigate reality like a pro gamer. Unlike the school cafeteria's "mystery meat Mondays" which remain the universe's greatest unsolved mystery.`,
    'genz': `NGL, ${topic} is actually sooo fire when you get it. It's like when your FYP algorithm finally understands your exact vibe and only shows you peak content. ${topic} is basically the main character of scientific concepts - it doesn't follow basic rules, it MAKES them. Pretty based, actually! It slaps harder than that song everyone uses for their transformation edits. The way ${topic} works is literally living rent-free in my head right now.`,
    'comedian': `Middle school, huh? Well, ${topic} is exactly like that awkward school dance where nobody knows where to put their hands and everyone's trying to look cool while internally panicking. It seems complicated but really it's just a bunch of simple parts pretending they know what they're doing! And just like middle school, ${topic} makes weird, unexpected noises that nobody acknowledges! Remember how your voice kept cracking during your class presentation? Yeah, ${topic} is equally unpredictable but somehow still gets a passing grade!`
  };
  
  return responses[persona];
}

function getEli20Response(topic: string, persona: PersonaMode): string {
  const responses: Record<PersonaMode, string> = {
    'professor': `A comprehensive analysis of ${topic} reveals its multifaceted nature that permeates various disciplines. At its foundation, ${topic} operates according to fundamental principles that can be observed, measured, and occasionally bribed with sufficient grant funding. The mechanisms underlying ${topic} have been studied extensively by researchers who clearly needed to get out more, revealing complex interactions that make quantum physics look like a children's puzzle.\n\nFurthermore, recent advances in our understanding of ${topic} have illuminated previously obscure aspects, leading to new theoretical frameworks that better explain observed phenomena while creating twice as many questions as answers. These developments have significant implications across multiple domains, much like my coffee addiction has significant implications across multiple aspects of my life, including my ability to grade papers without falling asleep.`,
    'geek': `Let's dive deep into ${topic} from a technical perspective. The underlying architecture consists of interconnected systems that make the TCP/IP protocol look like it was designed by kindergartners. When examining ${topic} at scale, emergent properties become apparent that would make even the most complex neural networks seem like "Hello World" programs.\n\nThe technical specifications of ${topic} typically include parameters that can be optimized for different use cases, assuming you have approximately 17 PhDs and a supercomputer at your disposal. Advanced implementations may incorporate algorithms so sophisticated they make machine learning look like basic arithmetic. It's basically the difference between "Hello World" and writing an operating system while blindfolded, using only your elbows to type, and having a cat randomly walk across your keyboard every 30 seconds.`,
    'genz': `Okay, real talk about ${topic}? It's actually way more complex than most people realize, and that's not even cap. Like, on a fundamental level, it's processing massive amounts of data and making split-second decisions constantly - main character behavior for real. No cap, the algorithms behind ${topic} are genuinely mind-blowing when you actually understand them.\n\nWhat makes ${topic} particularly interesting is how it intersects with cultural and social dynamics in ways that weren't possible before. The meta-analysis of how ${topic} evolves over time is literally changing how we think about systems in general. Pretty based when you think about it. It's giving revolutionary vibes, and I'm here for it. If ${topic} was a person, they'd definitely be that friend who somehow knows everything about everything and still manages not to be annoying about it.`,
    'comedian': `Alright, buckle up for ${topic} - the thing everyone pretends to understand at dinner parties but secretly Googles later while hiding in the bathroom! It's like that friend who speaks five languages but still can't figure out how to use the self-checkout machine without requiring staff assistance.\n\nThe hilarious thing about ${topic} is that experts have been arguing about it for decades, writing thousand-page books that basically say "it's complicated" but with more syllables. Meanwhile, the rest of us are just trying to understand the basic concept without accidentally revealing our ignorance. It's the academic equivalent of pretending to remember someone's name way too long after you should have asked! "Hey... you! Great to see you again, buddy... pal... friend whose name I definitely know because I'm a functioning adult who pays taxes!"`
  };
  
  return responses[persona];
}

function getShowerThoughtResponse(topic: string, persona: PersonaMode): string {
  const responses: Record<PersonaMode, string> = {
    'professor': `What if ${topic} is merely our perception of higher-dimensional phenomena projecting onto our limited three-dimensional understanding? Consider this mind-bending possibility: just as a shadow is a 2D representation of a 3D object, perhaps ${topic} is the "shadow" of something far more complex existing beyond our sensory capabilities - like trying to explain TikTok to someone from the 1800s.\n\nFurthermore, if our understanding of ${topic} suddenly shifted, would the fundamental nature of reality as we experience it change accordingly? These epistemological boundaries invite profound contemplation. It's like wondering if the universe exists when you close the refrigerator door, but with more academic jargon and fewer midnight snacks.`,
    'geek': `Here's a mind-bender: What if ${topic} is actually a naturally emergent property of complexity, similar to how Conway's Game of Life produces unexpected patterns from simple rules? The computational universe theory suggests that reality itself might be a simulation built on simple mathematical foundations - which would explain why the universe keeps using the "turn it off and on again" solution for so many problems.\n\nAnd consider this: if ${topic} were to be fully simulated at the quantum level, would the simulation itself develop consciousness? The recursive implications are staggering when you apply Gödel's Incompleteness Theorems to self-referential systems like ${topic}. This is the kind of stuff that makes me stare at my ceiling fan at 3 AM while my code compiles and my pizza gets cold.`,
    'genz': `Okay but like... what if ${topic} is just the universe's way of creating viral content? Like, we think we invented or discovered ${topic}, but maybe it's been waiting for someone to notice it this whole time? It's basically been dropping hints for centuries, and we're just now getting the notification.\n\nAnd here's something that will literally break your brain: what if ${topic} is completely different in parallel universes? Like in some alternate reality, people are completely shocked at how our version of ${topic} works because theirs is totally different. The multiverse is wild fr fr. It's like how your room looks clean until your mom walks in and suddenly it's "a disaster zone." Different perspectives, same reality - but what if they're not even the same reality? Mind. Blown.`,
    'comedian': `What if ${topic} is just the universe's way of playing a cosmic practical joke? Like, we're all seriously studying and analyzing it, and meanwhile some interdimensional beings are watching us like "Look at them trying to figure it out! Should we tell them it's just space hiccups?" It's cosmic reality TV, and we're the unwitting stars!\n\nAnd here's another one: what if ${topic} only works because we believe it works? Like the placebo effect, but for reality itself. One day someone's going to say "wait, that makes no sense" and suddenly ${topic} just stops working worldwide. Chaos ensues. Cats and dogs living together. Mass hysteria! Stock markets crash, Netflix adds even MORE commercials, and all because someone had to be a smarty-pants during their morning shower thoughts. Be responsible with your existential crises, people!`
  };
  
  return responses[persona];
}
